import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import BackgroundImage from './background-home.jpg'

const backgroundImageUrl = `/background-home.jpg`;

function Banner() {
  return (
    <section
      className="text-center text-light"
      style={{
        backgroundImage:
          `url(${backgroundImageUrl})`,
      }}
    >
      <Container>
        <Row className="p-5">
          <h1 className="fw-bold">conduit</h1>
          <p>A place to share your knowledge.</p>
        </Row>
      </Container>
    </section>
  );
}

export default Banner;
