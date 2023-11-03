import classNames from "classnames";
import { Link } from "react-router-dom";

import { Avatar } from "src/components";

function AuthorArticle({ author, createAt, horizontal = false }) {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (!author) return 'Loading...'
  return (
    <div className="d-flex">
      <Link to={`/profile/${author.username}`}>
        <div className="me-2 my-auto d-block">
          <Avatar url={author.image} />
        </div>
      </Link>
      <div className={classNames({'d-flex': horizontal}, ' align-items-center')}>
        <Link
          className="me-2"
          style={{ textDecoration: "none", color: 'inherit' }}
          to={`/profile/${author.username}`}
        >
          {author.username}
        </Link>
        <p className="fw-lighter my-0" style={{ fontSize: "12px" }}>
          {formatDate(createAt)}
        </p>
      </div>
    </div>
  );
}

export default AuthorArticle;
