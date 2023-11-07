import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "src/constants";

import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { OutlineButton } from "src/components";
import ListArticle from "../home/ListArticle";
import { AuthContext } from "src/context";
import { Avatar } from "src/components";
import { followProfile, unFollowProfile } from "src/utils";

const tabs = {
  MY_ARTICLES: "my-articles",
  FAVORITED_ARTICLES: "favorited-articles",
};

function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { currentUser } = useContext(AuthContext);
  const user = currentUser ? currentUser : {};
  const [profile, setProfile] = useState({});
  const [currentTab, setCurrentTab] = useState(tabs.MY_ARTICLES);
  useEffect(() => {
    axios.get(`${BASE_URL}/profiles/${username}`).then((res) => {
      const data = res.data;
      const { profile: profileFromApi } = data;
      setProfile(profileFromApi);
    });
  }, [username]);
  const { image, following } = profile;

  const navigateToEditProfile = () => {
    navigate("/settings");
  };

  const unFollow = async () => {
    const p = await unFollowProfile(username);
    
    setProfile(p);
  };

  const follow = () => {
    followProfile(username).then(p => {
      setProfile(p)
    })
  };
  return (
    <div>
      <section
        className=" text-center pt-5 pb-2"
        style={{ backgroundColor: "#f3f3f3" }}
      >
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="px-5">
            <Avatar url={image} width={100} />
            <h2 className="mt-2">{username}</h2>
            <div className="d-flex justify-content-end px-5">
              {username === user.username ? (
                <OutlineButton clickButton={navigateToEditProfile}>
                  <i className="bi bi-gear-fill me-1"></i>
                  <span>Edit Profile Settings</span>
                </OutlineButton>
              ) : (
                <>
                  {following ? (
                    <OutlineButton clickButton={unFollow}>
                      <i className="bi bi-plus-lg"></i>{" "}
                      <span>Unfollow {username}</span>
                    </OutlineButton>
                  ) : (
                    <OutlineButton clickButton={follow}>
                      <i className="bi bi-plus-lg"></i>{" "}
                      <span>Follow {username}</span>
                    </OutlineButton>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <div style={{ width: "960px" }}>
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
