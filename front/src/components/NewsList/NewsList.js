import { Suspense } from "react";
import NewsCard from "../NewsCard";
import "./NewsList.css";

function NewsList({ newsList, isPending }) {
  const style = isPending
    ? "newscard-container newscard-pending"
    : "newscard-container";

  return (
    <div className={style}>
      {newsList.map((news) => (
        <Suspense
          key={news._id}
          fallback={<h2>뉴스를 가져오는 중입니다...</h2>}
        >
          <NewsCard news={news} />
        </Suspense>
      ))}
    </div>
  );
}

export default NewsList;
