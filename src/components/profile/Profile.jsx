import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, defaultImg } from "src/constants";

import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { OutlineButton } from "src/components/utils";
import ListArticle from "../home/ListArticle";

const tabs = {
  MY_ARTICLES: "my-articles",
  FAVORITED_ARTICLES: "favorited-articles",
};

function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState({});
  const [currentTab, setCurrentTab] = useState(tabs.MY_ARTICLES);
  useEffect(() => {
    axios.get(`${BASE_URL}/profiles/${username}`).then((res) => {
      const data = res.data;
      const { profile: profileFromApi } = data;
      console.log(profileFromApi);
      setProfile(profileFromApi);
    });
  }, [username]);
  const { image } = profile;
  return (
    <div>
      <section
        className=" text-center pt-5 pb-2"
        style={{ backgroundColor: "#f3f3f3" }}
      >
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="px-5">
            <Image src={image || defaultImg} width={100} roundedCircle />
            <h2>{username}</h2>
            <div className="d-flex justify-content-end px-5">
              <OutlineButton>
                {" "}
                <i className="bi bi-plus-lg"></i> Follow {username}{" "}
              </OutlineButton>
            </div>
          </div>
        </div>
      </section>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <div style={{width: '960px'}}>
            <Nav variant="tabs" defaultActiveKey={tabs.MY_ARTICLES}>
              <Nav.Item>
                <Nav.Link
                  onClick={() => setCurrentTab(tabs.MY_ARTICLES)}
                  eventKey={tabs.MY_ARTICLES}
                >
                  My Articles
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => setCurrentTab(tabs.FAVORITED_ARTICLES)}
                  eventKey={tabs.FAVORITED_ARTICLES}
                >
                  Favorited Articles
                </Nav.Link>
              </Nav.Item>
            </Nav>
            {currentTab == tabs.MY_ARTICLES ? (
              <ListArticle isFeed={false} author={username} />
            ) : (
              <ListArticle isFeed={false} favorited={username} />
            )}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
