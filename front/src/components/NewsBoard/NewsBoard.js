import { useState, useEffect } from "react";
import DbSelectBox from "../DbSelectBox";
import NewsSelectBox from "../NewsSelectBox";
import NewsList from "../NewsList";
import PagenationBar from "../PaginationBar";
import * as Api from "../../api";
import "./NewsBoard.css";

function NewsBoard() {
  const [newsList, setNewsList] = useState([]);
  const [newsQueryObject, setNewsQueryObject] = useState({
    page: 1,
    length: 50,
  });

  useEffect(() => {
    const fetchNewsList = async () => {
      const searchParams = new URLSearchParams(newsQueryObject);
      const query = "?" + searchParams.toString();

      const response = await Api.get("api/newslist", query);
      setNewsList(response.data);
    };

    fetchNewsList();
  }, [newsQueryObject]);

  return (
    <div className="news-board">
      <div className="left">
        <DbSelectBox setNewsQueryObject={setNewsQueryObject} />
        <NewsSelectBox setNewsQueryObject={setNewsQueryObject} />
        <PagenationBar setNewsQueryObject={setNewsQueryObject} />
      </div>
      <div className="right">
        <NewsList newsList={newsList} />
      </div>
    </div>
  );
}

export default NewsBoard;
