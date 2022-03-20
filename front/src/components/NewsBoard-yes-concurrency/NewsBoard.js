import { useState, useEffect, useTransition } from "react";
import DbSelectBox from "../DbSelectBox";
import NewsSelectBox from "../NewsSelectBox";
import NewsList from "../NewsList";
import PaginationBar from "../PaginationBar";
import * as Api from "../../api";
import "./NewsBoard.css";

function NewsBoard() {
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);

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

  const [isPending, startTransition] = useTransition({ timeoutMs: 10000 });

  const fetchNewsList = async (queryObj, isNew = true) => {
    if (isNew) {
      queryObj = { ...queryObj, page: 1 };
      setPage(1);
    }
    console.log({ queryObj });

    const searchParams = new URLSearchParams(queryObj);
    const query = "?" + searchParams.toString();

    console.log({ isPending });
    const res = await Api.get("api/newslist", query);
    console.dir(res.data);
    setNewsList(res.data);
    console.log({ isPending });
  };

  useEffect(() => {
    fetchNewsList({
      page: 1,
      length: 100,
    });
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
        <NewsList newsList={newsList} isPending={isPending} />
      </div>
    </div>
  );
}

export default NewsBoard;
