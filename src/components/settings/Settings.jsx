import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { AuthContext } from "src/context";
import axios from "axios";
import { BASE_URL } from "src/constants";
import { OutlineButton } from "..";

function Settings() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const {
    image: oldImage,
    username: oldUsername,
    email: oldEmail,
    bio: oldBio,
    token,
  } = currentUser;

  const [image, setImage] = useState(oldImage);
  const [username, setUsername] = useState(oldUsername);
  const [bio, setBio] = useState(oldBio ?? "");
  const [email, setEmail] = useState(oldEmail);
  const [password, setPassword] = useState("");

  // const [errors, setErrors] = useState([]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const newUser = Object.assign(
      {},
      (image && currentUser.image != image) && { image },
      (username && currentUser.username != username) && { username },
      (bio && currentUser.bio != bio ) && { bio },
      (email && currentUser.email != email ) && { email },
      password && { password }
    );

    axios
      .put(
        `${BASE_URL}/user`,
        {
          user: newUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const { data } = res;
        const { user } = data;
        setCurrentUser(user);
        navigate(`/profile/${user.username}`)
      });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Container className="p-5 ">
      <Row className="justify-content-center">
        <Col sm={6}>
          <h1 className="text-center">Your Profile</h1>
          <Form onSubmit={handleUpdateProfile}>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label className="text-start">Image</Form.Label>
              <Form.Control
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Url of profile picture"
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="text-start">Username</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bio">
              <Form.Label className="text-start ms-0">Bio</Form.Label>
              <Form.Control
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                as="textarea"
                placeholder="Short bio about you"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="text-start">Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                type="text"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="text-start">Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                type="password"
              />
            </Form.Group>
            {/* {!!errors.length &&
              errors.map((e, i) => {
                return (
                  <p className="py-0 my-0 text-danger" key={i}>
                    {e}
                  </p>
                );
              })} */}
            <Button className="float-end" type="submit">
              Update profile
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm="6" className="border-top mt-3 p-0">
            <div style={{ marginTop: '1rem', marginLeft: 0 , padding: 0 }}>
              <OutlineButton clickButton={logout} outlineType={'danger'}>Or click here to logout</OutlineButton>
            </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;
