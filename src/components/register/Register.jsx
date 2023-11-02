import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL, defaultImg } from "src/constants";
import { AuthContext } from "src/context";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { setCurrentUser } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/users/`, {
        user: {
          username,
          email,
          password,
        },
      })
      .then((res) => {
        const { user } = res.data;
        if (user.image) user.image = defaultImg
        if (user && user.token) {
          setCurrentUser(user);
        }

        navigate("/");
      })
      .catch((err) => {
        const listErr = err.response ? err.response.data.body : [];
        setErrors(listErr.map((e) => (e.startsWith("user.") ? e.slice(5) : e)));
      });
  };

  return (
    <Container className="p-5 ">
      <Row className="justify-content-center">
        <Col sm={6}>
          <h1 className="text-center">Sign up</h1>
          <Link to={"/login"}>
            <p className="text-center">Have an account? </p>
          </Link>
          <Form onSubmit={handleSignUp}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="text-start">Username</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="text-start">Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="text-start ms-0">Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </Form.Group>
            {!!errors.length &&
              errors.map((e, i) => {
                return (
                  <p className="py-0 my-0 text-danger" key={i}>
                    {e}
                  </p>
                );
              })}
            <Button type="submit">Sign up</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
