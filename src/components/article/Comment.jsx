import Card from "react-bootstrap/Card";
import AuthorArticle from "./AuthorArticle";

function Comment({ comment }) {
  const { body, author, updateAt } = comment
  return (
    <Card className="text-start ">
      <Card.Body>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <AuthorArticle author={author} createAt={updateAt} />
      </Card.Footer>
    </Card>
  );
}

export default Comment;
