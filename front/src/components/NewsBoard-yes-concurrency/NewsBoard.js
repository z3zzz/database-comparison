import { useState, useEffect, useTransition, Suspense } from "react";
import DbSelectBox from "../DbSelectBox";
import NewsSelectBox from "../NewsSelectBox";
import NewsList from "../NewsList";
import PaginationBar from "../PaginationBar";
import * as Api from "../../api";
import "./NewsBoard.css";

function NewsBoard() {
  const [newsList, setNewsList] = useState([]);
  const [newsQueryObject, setNewsQueryObject] = useState({
    page: 1,
    length: 2000,
  });

  const [isPending, startTransition] = useTransition({ timeoutMs: 10000 });

  const fetchNewsList = async (queryObj) => {
    const searchParams = new URLSearchParams(queryObj);
    const query = "?" + searchParams.toString();

    const res = await Api.get("api/newslist", query);
    setNewsList(res.data);
  };

  useEffect(() => {
    fetchNewsList({ page: 1, length: 2000 });
  }, []);

  return (
    <div className="news-board">
      <div className="left">
        <DbSelectBox setNewsQueryObject={setNewsQueryObject} />
        <NewsSelectBox setNewsQueryObject={setNewsQueryObject} />
        <PaginationBar
          newsQueryObject={newsQueryObject}
          setNewsQueryObject={setNewsQueryObject}
          isPending={isPending}
          startTransition={startTransition}
          fetchNewsList={fetchNewsList}
        />
      </div>
      <div className="right">
        <Suspense fallback={<h2>뉴스를 가져오고 있습니다...</h2>}>
          <NewsList newsList={newsList} isPending={isPending} />
        </Suspense>
      </div>
    </div>
  );
}

export default NewsBoard;
