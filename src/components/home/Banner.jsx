import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
function Banner() {
  return (
    <section className="bg-primary text-center text-light">
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
