import classNames from "classnames";
import { Link } from "react-router-dom";
import AuthorArticle from "../article/AuthorArticle";
import ListTagOfArticle from "./ListTagOfArticle";

function ArticlePreview({ article }) {
  const {
    author,
    createAt,
    favoritesCount,
    favorited,
    title,
    description,
    tagList,
    slug,
  } = article;
  console.log(author);

  return (
    <div className="border-top py-3">
      <div className="d-flex flex-row align-items-center">
        <AuthorArticle author={author} createAt={createAt} />
        <button
          className={classNames("btn", "btn-outline-primary", "ms-auto", {
            active: favorited,
          })}
          style={{ fontSize: "12px" }}
        >
          <i className="bi bi-heart-fill"></i>
          <span className="mx-1">{favoritesCount}</span>
        </button>
      </div>
      <Link
        to={`/article/${slug}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div>
          <h4>{title}</h4>
          <p className="fw-lighter"> {description} </p>
        </div>
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <span className="fw-lighter" style={{ fontSize: "12px" }}>
            Read more...
          </span>
          <ListTagOfArticle tagList={tagList} />
        </div>
      </Link>
    </div>
  );
}

export default ArticlePreview;
