import React, {useState} from "react";
import Axios from "axios";
import {domain} from "../env";
import {Link, useHistory} from "react-router-dom";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

const RegisterPage = () => {
    const history = useHistory()

    const registernewuser = async (event) => {
        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const password1 = form.password1.value;
        const password2 = form.password2.value;

        console.log(username, password1, password2)

        if (password1 !== password2)
        {
            alert("Password not matched !! Try Again .... ")
        }
        else
        {
            await Axios({
                method: "post",
                url: `${domain}/api/register/`,
                data: {
                    "username": username,
                    "password": password1
                }
            }).then(response => {
                // console.log(response.data)
                alert(response.data['message'])
                history.push("/login")
            })
        }
    }
    return (
        <div className="">
            {/*<h1 className="display-6">Registration</h1>*/}
            {/*<div className="form-group">*/}
            {/*    <label>Username</label>*/}
            {/*    <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" placeholder="Username"/>*/}
            {/*</div>*/}

            {/*<div className="form-group">*/}
            {/*    <label>Password</label>*/}
            {/*    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password"/>*/}
            {/*</div>*/}

            {/*<div className="form-group">*/}
            {/*    <label>Confirm Password</label>*/}
            {/*    <input onChange={(e) => setConfirmpassword(e.target.value)} type="password" className="form-control" placeholder="Confirm Password"/>*/}
            {/*</div>*/}

            {/*<button onClick={registernewuser} className="btn btn-info my-2">Register</button>*/}


            <div className="">
                <Container>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col md={8} lg={6} xs={12}>
                            <div className="border border-4 rounded-top border-primary"></div>
                            <Card className="shadow border border-0 radius-top register-bg-control">
                                <Card.Body>
                                    <div className="mb-3 mt-md-4">
                                        <h2 className="fw-bold mb-2 text-uppercase ">Register</h2>
                                        <p className=" mb-5">Please enter your Username and password!</p>
                                        <div className="mb-3">
                                            <Form onSubmit={registernewuser}>

                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label className="text-center">
                                                        Username
                                                    </Form.Label>
                                                    <Form.Control name="username" type="text" placeholder="Enter Username"
                                                                  required/>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicPassword1">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control name="password1" type="password" placeholder="Password"
                                                                  required/>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicPassword2">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control name="password2" type="password" placeholder="Confirm password"
                                                                  required/>
                                                </Form.Group>

                                                <div className="d-grid">
                                                    <Button className="submit-btn border border-0" type="submit">
                                                        Register
                                                    </Button>
                                                </div>


                                            </Form>
                                            <div className="mt-3">
                                                <p className="mb-0  text-center">
                                                    Already have an account?{" "}
                                                    <Link to="/login" className="text-primary fw-bold">
                                                        Login
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

export default RegisterPage