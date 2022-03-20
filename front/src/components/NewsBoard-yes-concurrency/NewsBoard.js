import { useState, useEffect, useTransition, Suspense } from "react";
import DbSelectBox from "../DbSelectBox";
import NewsSelectBox from "../NewsSelectBox";
import NewsList from "../NewsList";
import PaginationBar from "../PaginationBar";
import * as Api from "../../api";
import "./NewsBoard.css";

function NewsBoard() {
  const fetchNewsList = async (queryObj, isNew = true) => {
    setIsFetching(true);
    if (isNew) {
      queryObj = { ...queryObj, page: 1 };
      setPage(1);
    }
    console.log({ queryObj });

    const searchParams = new URLSearchParams(queryObj);
    const query = "?" + searchParams.toString();

    const res = await Api.get("api/newslist", query);
    const newses = res.data;

    if (newses.length !== 0) {
      setIsNewsList(true);
    } else {
      setIsNewsList(false);
    }

    console.dir(newses);
    setIsFetching(false);
    startTransition(() => setNewsList(newses));
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
  const [isNewsList, setIsNewsList] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition({ timeoutMs: 10000 });

  useEffect(() => {
    const makeInitialNewsList = async (queryObj) => {
      const searchParams = new URLSearchParams(queryObj);
      const query = "?" + searchParams.toString();
      const res = await Api.get("api/newslist", query);
      setNewsList(res.data);
    };
    makeInitialNewsList({ page: 1, length: 100 });
  }, []);

  return (
    <div className="news-board">
      <div className="left">
        <DbSelectBox setNewsQueryObject={setNewsQueryObject} />
        <NewsSelectBox
          newsQueryObject={newsQueryObject}
          setNewsQueryObject={setNewsQueryObject}
          startTransition={startTransition}
          fetchNewsList={fetchNewsList}
        />
        <PaginationBar
          newsQueryObject={newsQueryObject}
          setNewsQueryObject={setNewsQueryObject}
          startTransition={startTransition}
          fetchNewsList={fetchNewsList}
          page={page}
          setPage={setPage}
        />
      </div>
      <div className="right">
        <Suspense>
          <NewsList
            newsList={newsList}
            isPending={isPending}
            isNewsList={isNewsList}
            isFetching={isFetching}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default NewsBoard;
