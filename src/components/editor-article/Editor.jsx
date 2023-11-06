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

  const [article, setArticle] = useState({
    title: '',
    description: '',
    body: '',
    tags: '',
  });

  const changeDetail = (prop) => {
    setArticle(a => ({ ...a, ...prop }))
  }

  const [errors, setErrors] = useState([]);


  useEffect(() => {
    if (slug) {
      axios
        .get(`${BASE_URL}/articles/${slug}`)
        .then((res) => {
          const data = res.data;
          const { article } = data;
          setArticle({article})
        });
    }
  }, [slug]);

  const handleNewArticle = (e) => {
    e.preventDefault();
    const tagList = article.tags
      .trim()
      .split(/\s+/)
      .filter((t) => t);
    const articleSubmit = {
      ...article, tagList
    };
    axios
      .post(
        `${BASE_URL}/articles`,
        {
          article: articleSubmit,
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
                  value={article.title}
                  onChange={(e) => changeDetail({ title: e.target.value })}
                  placeholder="Article Title"
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label className="text-start">Description</Form.Label>
                <Form.Control
                  value={article.description}
                  onChange={(e) => changeDetail({ description: e.target.value })}
                  placeholder="What 's this article about?"
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="body">
                <Form.Label className="text-start ms-0">Body</Form.Label>
                <Form.Control
                  value={article.body}
                  onChange={(e) => changeDetail({ body: e.target.value })}
                  as="textarea"
                  rows={10}
                  style={{ 'white-space': 'pre-line' }}
                  placeholder="Write your article"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="tags">
                <Form.Label className="text-start">Tags</Form.Label>
                <Form.Control
                  value={article.tags}
                  onChange={(e) => changeDetail({ tags: e.target.value })}
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
