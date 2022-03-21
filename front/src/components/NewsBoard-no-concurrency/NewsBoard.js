import { useState, useEffect } from "react";
import DbSelectBox from "../DbSelectBox";
import NewsSelectBox from "../NewsSelectBox";
import NewsList from "../NewsList-no-concurrency";
import PaginationBar from "../PaginationBar";
import * as Api from "../../api";
import "./NewsBoard.css";

function NewsBoard() {
  const fetchNewsList = async (queryObj, isNew = true) => {
    const startTime = performance.now();
    setIsFetching(true);
    setIsNewsList(true);

    if (isNew) {
      queryObj = { ...queryObj, page: 1 };
      setPage(1);
      setMaxPage(1);
    }
    console.log({ queryObj });

    const searchParams = new URLSearchParams(queryObj);
    const query = "?" + searchParams.toString();

    const res = await Api.get("api/newslist", query);
    const newses = res.data.newses;
    const newsTotalCount = res.data.totalCount;

    setMaxPage(Math.floor(newsTotalCount / queryObj.length) + 1);

    if (newsTotalCount === 0) {
      setIsNewsList(false);
      setPage(1);
      setMaxPage(1);
    } else {
      setIsNewsList(true);
    }

    setNewsCount(newsTotalCount);

    setNewsList(newses);

    setIsFetching(false);
    const endTime = performance.now();
    setPerformanceTime(endTime - startTime);
  };

  const initialQueryObj = {
    page: 1,
    length: 100,
    title: "",
    company: "",
    category: "",
    date: "",
    dbType: "mongodb",
  };

  const [newsQueryObject, setNewsQueryObject] = useState(initialQueryObj);
  const [newsList, setNewsList] = useState([]);
  const [newsCount, setNewsCount] = useState(0);
  const [isNewsList, setIsNewsList] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [performanceTime, setPerformanceTime] = useState(0);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const makeInitialNewsList = async (queryObj) => {
      const startTime = performance.now();
      setIsFetching(true);

      const searchParams = new URLSearchParams(queryObj);
      const query = "?" + searchParams.toString();
      const res = await Api.get("api/newslist", query);
      const newses = res.data.newses;
      const newsTotalCount = res.data.totalCount;

      setNewsCount(newsTotalCount);
      setNewsList(newses);
      setMaxPage(Math.floor(newsTotalCount / queryObj.length));

      setIsFetching(false);
      const endTime = performance.now();
      setPerformanceTime(endTime - startTime);
    };
    makeInitialNewsList({ page: 1, length: 100 });
  }, []);

  const makeNumberWithComma = (n) =>
    n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const convertMiliSeconds = (ms) => (ms / 1000).toFixed(2);

  return (
    <div className="news-board">
      <div className="left">
        <DbSelectBox setNewsQueryObject={setNewsQueryObject} />
        <NewsSelectBox
          newsQueryObject={newsQueryObject}
          setNewsQueryObject={setNewsQueryObject}
          fetchNewsList={fetchNewsList}
        />
        <PaginationBar
          newsQueryObject={newsQueryObject}
          setNewsQueryObject={setNewsQueryObject}
          fetchNewsList={fetchNewsList}
          page={page}
          setPage={setPage}
          maxPage={maxPage}
        />
      </div>
      <div className="right">
        <span className="news-count-text">
          기사 수: {makeNumberWithComma(newsCount)}개 (
          {convertMiliSeconds(performanceTime)}초)
        </span>
        <NewsList
          newsList={newsList}
          isNewsList={isNewsList}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
}

export default NewsBoard;
