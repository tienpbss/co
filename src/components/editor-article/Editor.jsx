import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { AuthContext } from "src/context";
import axios from "axios";
import { BASE_URL } from "src/constants";

function Editor() {
  const navigate = useNavigate();

  const { slug } = useParams();

  const {
    currentUser: { token },
  } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (slug) {
      axios
        .get(`${BASE_URL}/articles/${slug}`)
        .then((res) => {
          const data = res.data;
          const { article: {title, description, body, tagList} } = data;
          setTitle(title);
          setDescription(description);
          setBody(body);
          setTags(tagList.join(' '))
        });
    }
  }, [slug]);

  const handleNewArticle = (e) => {
    e.preventDefault();
    const tagList = tags
      .trim()
      .split(/\s+/)
      .filter((t) => t);
    const article = {
      title,
      description,
      body,
      tagList,
    };
    axios
      .post(
        `${BASE_URL}/articles`,
        {
          article,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const data = res.data;
        const { article } = data;
        navigate(`/article/${article.slug}`);
      })
      .catch((err) => {
        const {
          response: { data },
        } = err;
        const errors = data.body && data.body.map((e) => e.split(".").at(-1));
        setErrors(errors || []);
      });
  };

  return (
    <div>
      <ToastContainer style={{ marginTop: "4rem" }} position="top-end">
        <Toast
          style={{ backgroundColor: "#fbe8e9" }}
          onClose={() => setErrors([])}
          show={errors.length > 0}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <i className="bi bi-x-circle-fill text-danger me-2"></i>
            <strong className="me-auto">Errors</strong>
          </Toast.Header>
          {/* <Toast.Body>Some error</Toast.Body> */}
          {errors.map((e, i) => (
            <Toast.Body key={i}>{e}</Toast.Body>
          ))}
        </Toast>
      </ToastContainer>
      <Container className="p-5 ">
        <Row className="justify-content-center">
          <Col sm={6}>
            <h1 className="text-center">New Article</h1>
            <Form onSubmit={handleNewArticle}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="text-start">Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Article Title"
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label className="text-start">Description</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What 's this article about?"
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="body">
                <Form.Label className="text-start ms-0">Body</Form.Label>
                <Form.Control
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  as="textarea"
                  rows={10}
                  placeholder="Write your article"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="tags">
                <Form.Label className="text-start">Tags</Form.Label>
                <Form.Control
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter tags separate by '  '"
                  type="text"
                />
              </Form.Group>
              <Button className="float-end" type="submit">
                Publish Article
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Editor;
