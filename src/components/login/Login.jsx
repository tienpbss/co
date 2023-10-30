import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

import axios from "axios";
import { useState } from "react";

import { BASE_URL } from "src/constants";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/users/login`, {
      user: {
        email,
        password
      }
    })
    .then(res => {
      const { user } = res.data;
      if (user && user.token) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <Container className="p-5 ">
      <Row className="justify-content-center">
        <Col sm={6}>
          <h1 className="text-center">Login</h1>
          <Link to={"/register"}>
            <p className="text-center">Need an account? </p>
          </Link>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="text-start">Email</Form.Label>
              <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="text-start ms-0">Password</Form.Label>
              <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" rows={3} />
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
