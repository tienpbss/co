import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Stack from "react-bootstrap/Stack";

import { BASE_URL } from "src/constants";
import AuthorArticle from "./AuthorArticle";
import ListTagOfArticle from "../home/ListTagOfArticle";
import Comment from "./Comment";
import { OutlineButton } from "src/components/utils";

function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState(["Place holder"]);
  useEffect(() => {
    axios.get(`${BASE_URL}/articles/${slug}`).then((res) => {
      const { article: articleFromApi } = res.data;
      console.log(articleFromApi);
      setArticle(articleFromApi);
    });
    axios.get(`${BASE_URL}/articles/${slug}/comments`).then((res) => {
      const { data } = res;
      const { comments: commentsFromApi } = data;
      console.log(commentsFromApi);
      setComments(commentsFromApi);
    });
  }, [slug]);
  const {
    title,
    author = {},
    createAt,
    favoritesCount,
    body,
    tagList = [],
  } = article;
  const { username = "" } = author;

  return (
    <div>
      <section className="bg-dark bg-gradient text-light p-4">
        <div className="container">
          <h1>{title}</h1>
          <div className="d-flex align-items-center">
            <AuthorArticle author={author} createAt={createAt} />
            <div className="ms-4">
              <OutlineButton >
                {" "}
                <i className="bi bi-plus-lg"></i> Follow {username}{" "}
              </OutlineButton>
              <OutlineButton outlineType={'primary'}>
                {" "}
                <i className="bi bi-heart-fill"></i> Favorite Article{" "}
                {`(${favoritesCount})`}{" "}
              </OutlineButton>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div className="container border-bottom py-5">
          <div>
            <p>{body}</p>
          </div>
          <ListTagOfArticle tagList={tagList} />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="d-flex justify-content-center pt-3">
            <AuthorArticle author={author} createAt={createAt} />
            <div className="ms-4">
              <OutlineButton>
                {" "}
                <i className="bi bi-plus-lg"></i> Follow {username}{" "}
              </OutlineButton>
              <OutlineButton outlineType={'primary'}>
                {" "}
                <i className="bi bi-heart-fill"></i> Favorite Article{" "}
                {`(${favoritesCount})`}{" "}
              </OutlineButton>
            </div>
          </div>
          <Stack gap={2} className="col-md-6 mx-auto">
            <p className="mt-5 mb-3 text-center">
              <Link to={"/login"}>Sign in</Link> or{" "}
              <Link to={"/register"}>sign up</Link> to add comments on this
              article.{" "}
            </p>
            {comments.map((c, i) => (
              <Comment key={i} comment={c} />
            ))}
          </Stack>
        </div>
      </section>
    </div>
  );
}

export default Article;
