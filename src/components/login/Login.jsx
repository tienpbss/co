import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { BASE_URL, defaultImg } from "src/constants";
import { AuthContext } from "src/context";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inValid, setInValid] = useState(false);
  const {setCurrentUser} = useContext(AuthContext)

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
      if (!user.image) user.image = defaultImg
      if (user && user.token) {
        setCurrentUser(user)
      }
      navigate('/')
    })
    .catch(() => {
      setInValid(true)
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
              <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="text-start ms-0">Password</Form.Label>
              <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" rows={3} required />
            </Form.Group>
            <p className="text-danger">{ inValid && 'Email or password is invalid'}</p>
            <Button type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
