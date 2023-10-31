import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

import { defaultImg } from "src/constants";

function AuthorArticle({ author, createAt }) {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (!author) return 'Loading...'
  return (
    <div className="d-flex">
      <Image
        className="me-2 my-auto d-block"
        src={author.image || defaultImg}
        width={25}
        roundedCircle
      />
      <div>
        <Link
          style={{ textDecoration: "none", color: 'inherit' }}
          to={`profile/${author.username}`}
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
