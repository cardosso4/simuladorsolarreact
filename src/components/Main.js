import React from "react";
import '../App.css';
import logo from '../logo.svg';

import {Button,Form,Image} from 'react-bootstrap';
import {Container,Row,Col} from 'react-bootstrap';

export default function Login(){
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
            </Container>
        </div>

    );
}