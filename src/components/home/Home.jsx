import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "src/constants";

import Banner from "./Banner";
import ListArticle from "./ListArticle";
import { AuthContext } from "src/context";

function Home() {
  const [tags, setTags] = useState([]);
  const [tagFilter, setTagFilter] = useState("");
  const [isFeed, setIsFeed] = useState(false);
  const [tabActive, setTabActive] = useState('global')
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    axios.get(`${BASE_URL}/tags`).then((res) => {
      const { data } = res;
      setTags(data.tags);
    });
  }, []);
  const selectTagHandle = (t) => {
    setTagFilter(t);
    setTabActive('tag')
  };
  const selectFeed = () => {
    setIsFeed(true)
    setTagFilter('')
    setTabActive('feed')
  }
  const selectGlobal = () => {
    setIsFeed(false)
    setTagFilter('')
    setTabActive('global')
  }
  return (
    <div>
      <Banner />
      <Container>
        <Row className="p-5">
          <Col md={9}>
            <Nav variant="tabs" defaultActiveKey='global' activeKey={tabActive}>
              {currentUser && (
                <Nav.Item >
                  <Nav.Link onClick={selectFeed} eventKey="feed">Your Feed</Nav.Link>
                </Nav.Item>
              )}
              <Nav.Item>
                <Nav.Link onClick={selectGlobal} eventKey="global">Global Feed</Nav.Link>
              </Nav.Item>
              {tagFilter && (
                <Nav.Item>
                  <Nav.Link active={true} eventKey="tag">{`# ${tagFilter}`}</Nav.Link>
                </Nav.Item>
              )}
            </Nav>

            <ListArticle isFeed={isFeed} tag={tagFilter ? tagFilter : null} />
          </Col>
          <Col md={3}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title> Popular tags </Card.Title>

                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {tags.map((t, i) => {
                    return (
                      <span
                        onClick={() => selectTagHandle(t)}
                        key={i}
                        className="m-1 p-1 bg-secondary text-light"
                        style={{ borderRadius: "10px", cursor: "pointer" }}
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
