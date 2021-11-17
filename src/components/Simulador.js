import React,{useState} from "react";
import '../App.css';
import axios from "axios";
import logo from '../logo.svg';

import {Button,Form,Image} from 'react-bootstrap';
import {Container,Row,Col,Table} from 'react-bootstrap';


export default function Simulador(){

    const [dados,setDados] = useState({parcelamento: []});
    const [spinner, setSpinner] = useState(false);
    const [tabela, setTabela] = useState(false);

    const numberFormat = (value) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
    }).format(value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const dados = Object.fromEntries(formData);

        var cep = dados.cep.trim();
        var valor = String(Math.round(dados.valor_conta.replace(',','.')));
        var tipo = dados.tipo.trim();

        setTabela(true);
        setSpinner(true);
        var url = encodeURI('http://localhost:8000/api/consulta/'+cep+'/'+valor+'/'+tipo);
        await axios.get(
            url,
            { headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: '+localStorage.getItem('token_acesso')
            }})
        .then((response) => {
            if(response.status === 200){
                setDados(response.data);
            }
        }).catch((err) => {
            console.log(err)
        });

        setTabela(false);
        setSpinner(false);
    }

    return(
        <Container className="vh-100 border border-2">
            <Row className="justify-content-md-center">
                <Col xs={10} md={10}>
                    <Form width="100%" onSubmit={handleSubmit}>
                        <h3>Simulador</h3>
                        <Form.Group className="d-flex align-items-center">
                            <Form.Control name="cep" className="m-4" placeholder="cep" />
                            <Form.Control name="valor_conta" className="m-4" placeholder="Valor da Conta" />
                            <Form.Control name="tipo"  className="m-4" placeholder="Tipo de telhado" />
                            <Button type="submit" variant="primary">Simular</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row style={spinner?{}:{ display: 'none' }} 
            className="border boder-2 justify-content-md-center mx-auto text-center">
                <Col xs={10} md={10} >
                    <Image className="App-logo"
                        width="250px" 
                        height="250px" 
                        src={logo}
                        roundedCircle />
                </Col>
            </Row>
            <Row className="border boder-2 justify-content-md-center" style={tabela?{ display: 'none' }:{}}>
                <Col xs={10} md={10}>
                    <Table>
                        <tr>
                            <td>Potência: {dados.potencial}</td>
                            <td>Economia: {dados.economia}</td>
                        </tr>
                    </Table>
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>Parcelas</th>
                                <th>Taxa minina</th>
                                <th>Taxa maxima</th>
                                <th>Valor maximo</th>      
                                <th>Valor minimo</th>                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dados.parcelamento.map((dado, index) => (
                                    <tr className="text-end">
                                        <td key={'key-'+dado.parcelas+'_1'}> { dado.parcelas } </td>
                                        <td key={'key-'+dado.parcelas+'_2'}> { dado.taxa_minina } </td>
                                        <td key={'key-'+dado.parcelas+'_3'}> { dado.taxa_maxima } </td>
                                        <td key={'key-'+dado.parcelas+'_4'}> { numberFormat(dado.valor_minimo) } </td>
                                        <td key={'key-'+dado.parcelas+'_5'}> { numberFormat(dado.valor_maximo) } </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
