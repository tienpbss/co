import Card from "react-bootstrap/Card";
import AuthorArticle from "./AuthorArticle";
import { useContext } from "react";
import { AuthContext } from "src/context";

function Comment({ comment, clickDeleteComment }) {
  const { currentUser } = useContext(AuthContext);
  const { id, body, author, updateAt } = comment;
  return (
    <Card className="text-start ">
      <Card.Body>
        <Card.Text>{body}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div className="d-flex justify-content-between align-items-center">
          <AuthorArticle author={author} createAt={updateAt} horizontal={true} />
          {currentUser && currentUser.username === author.username ? (
            <i
              onClick={() => clickDeleteComment(id)}
              className="bi bi-trash3-fill text-danger"
              style={{ cursor: "pointer" }}
            ></i>
          ) : null}
        </div>
      </Card.Footer>
    </Card>
  );
}

export default Comment;
