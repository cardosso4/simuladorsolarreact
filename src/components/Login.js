import React,{useState} from "react";
import '../App.css';
import logo from '../logo.svg';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

import {Button,Form,Image} from 'react-bootstrap';
import {Container,Row,Col,Alert} from 'react-bootstrap';

export default function Login(){

    const [show, setShow] = useState(false);
   
    localStorage.clear();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);


        setShow(true);
        axios.post('http://localhost:8000/api/login',data)
        .then((reponse) => {
            if(reponse.status === 200){
                localStorage.setItem('token_acesso',reponse.data.acess_token);
                navigate('/simulador');     
            }
        }).catch((err) => {
            setShow(true);
        });


    }

    return (
        <div className="App">
            <Container className="h-100">
                <Row className="justify-content-md-center">
                    <Col xs={6} md={3} className="text-center">
                        
                        <Image className="App-logo"
                        width="150px" 
                        height="150px" 
                        src={logo}
                        roundedCircle />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={3}>
                        <Form width="100%" onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control name="email"  className="my-4" placeholder="E-mail" />
                                <Form.Control type="password"  name="password" className="my-4" placeholder="Senha" />                               <Button type="submit" className="w-100" variant="primary">Login</Button>
                                <Alert className="my-4" variant="danger" show={show}>
                                    E-mail ou senha inv??lido
                                </Alert>                                                                       
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}