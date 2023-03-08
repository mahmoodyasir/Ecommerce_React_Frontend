import React, {useState} from "react";
import Axios from "axios";
import './css/Login.css'
import {domain} from "../env";
import {Card, Col, Container, Form, Row, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const LoginPage = () => {
    // const [username, setUsername] = useState(null);
    // const [password, setPassword] = useState(null);
    const loginrequest = async(event) => {

        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const password = form.password.value;

        console.log(username, password)

        await Axios({
            method: "post",
            url: `${domain}/api/login/`,
            data:{
                'username':username,
                'password':password
            }
        }).then(response => {
            console.log(response.data['token']);
            window.localStorage.setItem("token", response.data['token'])
            window.location.href = '/'
        }).catch(_=>{
            alert("Your username or password is incorrect !! Try Again ....")
        })
    }
    return (

        <div className="mt-4">
            <div className="">
                <Container>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col md={8} lg={6} xs={12}>
                            <div className="border border-4 rounded-top border-primary"></div>
                            <Card className="shadow border border-0 radius-top login-bg-control">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-uppercase ">Login</h2>
                                        <p className=" mb-5">Please enter your login credentials!</p>
                                        <div className="mb-3">
                                            <Form onSubmit={loginrequest}>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        Username
                                                    </Form.Label>
                                                    <Form.Control name="username" type="text" placeholder="Enter Username"
                                                                  required/>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control name="password" type="password" placeholder="Password"
                                                                  required/>
                                                </Form.Group>
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicCheckbox"
                                                >
                                                </Form.Group>
                                                <div className="d-grid">
                                                    <Button className="submit-btn border border-0" type="submit">
                                                        Login
                                                    </Button>
                                                </div>
                                            </Form>
                                            <div className="mt-3">
                                                <p className="mb-0  text-center">
                                                    Don't have an account?{" "}
                                                    <Link to="/register" className="text-primary fw-bold">
                                                        Register
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default LoginPage