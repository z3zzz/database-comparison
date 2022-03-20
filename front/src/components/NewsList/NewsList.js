import { Suspense } from "react";
import NewsCard from "../NewsCard";
import "./NewsList.css";

function NewsList({ newsList, isPending }) {
  const newsCardContainerClass = isPending
    ? "newscard-container newscard-pending"
    : "newscard-container";

  return (
    <div className={newsCardContainerClass}>
      <Suspense>
        {newsList.map((news) => (
          <NewsCard key={news._id} news={news} />
        ))}
      </Suspense>
    </div>
  );
}

export default NewsList;
