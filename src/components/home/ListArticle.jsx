import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "src/constants";
import ArticlePreview from "./ArticlePreview";
import Pagination from "react-bootstrap/Pagination";
import { AuthContext } from "src/context";
import { useNavigate } from "react-router-dom";

import { favoriteArticle, unFavoriteArticle } from "src/utils";

function ListArticle({
  isFeed,
  tag,
  author,
  favorited,
  limit = 10,
  offset = 0,
}) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [active, setActive] = useState(1);

  console.log(articles);

  const articlePerPage = 10;
  const pageCount = Math.ceil(articlesCount / articlePerPage);
  console.log(`${BASE_URL}/articles${isFeed ? "/feed" : ""}`);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/articles${isFeed ? "/feed" : ""}`, {
        params: { tag, author, favorited, limit, offset },
        headers: {
          Authorization: currentUser ? `Bearer ${currentUser.token}` : null,
        },
      })
      .then((res) => {
        const { data } = res;
        setArticles(data.articles);
        setArticlesCount(data.articlesCount);
      });
  }, [isFeed, tag, author, favorited, limit, offset, currentUser]);

  let items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => changePage(number)}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  const changePage = (number) => {
    setActive(number);
  };

  const favorite = (slug) => {
    if (!currentUser) navigate("/login");
    else {
      favoriteArticle(slug).then((article) => {
        setArticles((la) => la.map((a) => (a.slug != slug ? a : article)));
      });
    }
  };

  const unFavorite = (slug) => {
    if (!currentUser) navigate("/login");
    else {
      unFavoriteArticle(slug).then((article) => {
        setArticles((la) => la.map((a) => (a.slug != slug ? a : article)));
      });
    }
  };

  return (
    <div>
      {articles.map((a, i) => (
        <ArticlePreview
          article={a}
          key={i}
          favorite={favorite}
          unFavorite={unFavorite}
        />
      ))}
      <Pagination>{items}</Pagination>
    </div>
  );
}

export default ListArticle;
