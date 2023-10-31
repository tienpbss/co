import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "src/constants";
import AuthorArticle from "./AuthorArticle";

function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState({});
  useEffect(() => {
    axios.get(`${BASE_URL}/articles/${slug}`).then((res) => {
      const { article: articleFromApi } = res.data;
      console.log(articleFromApi);
      setArticle(articleFromApi);
    });
  }, [slug]);
  const { title, author, createAt } = article;
  return (
    <div className="bg-dark bg-gradient text-light p-4">
      <div className="container">
        <h1>{title}</h1>
        <div>
          <AuthorArticle author={author} createAt={createAt} />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Article;
