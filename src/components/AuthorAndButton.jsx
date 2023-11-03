import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthorArticle from "./article/AuthorArticle";
import { OutlineButton } from "src/components";
import { AuthContext } from "src/context";

const defaultFunction = () => {};

function AuthorAndButton({
  author,
  createAt,
  favorited = false,
  favoritesCount,
  slug,
  favorite = defaultFunction,
  unFavorite = defaultFunction,
  deleteArticle = defaultFunction,
  follow = defaultFunction,
  unFollow = defaultFunction
}) {
  const { currentUser } = useContext(AuthContext);
  const { username = "", following = false } = author;
  return (
    <div className="d-flex align-items-center">
      <AuthorArticle author={author} createAt={createAt} />
      <div className="ms-4">
        {currentUser && username === currentUser.username ? (
          <>
            <Link to={`/editor/${slug}`}>
              <OutlineButton>
                {" "}
                <i className="bi bi-pen-fill"></i> Edit Article
              </OutlineButton>
            </Link>
            <OutlineButton outlineType={"danger"} clickButton={deleteArticle}>
              {" "}
              <i className="bi bi-trash3-fill "></i> Delete Article
            </OutlineButton>
          </>
        ) : (
          <>
            <OutlineButton clickButton={following? unFollow: follow}>
              {" "}
              <i className="bi bi-plus-lg"></i> {following?'Unfollow':'Follow'} {username}{" "}
            </OutlineButton>
            <OutlineButton outlineType={"primary"} clickButton={favorited? unFavorite: favorite}>
              {" "}
              <i className="bi bi-heart-fill"></i>  {favorited?'Unfavorite':'Favorite'} Article{" "}
              {`(${favoritesCount})`}{" "}
            </OutlineButton>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthorAndButton;
