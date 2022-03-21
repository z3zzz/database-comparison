import NewsCard from "../NewsCard";
import "./NewsList.css";

function NewsList({ newsList, isNewsList, isFetching }) {
  const newsCardContainerClass = isFetching
    ? "newscard-container newscard-pending"
    : "newscard-container";

  return (
    <div className={newsCardContainerClass}>
      {isFetching && <h4>뉴스를 가져오고 있습니다...</h4>}
      {!isNewsList && <h4>해당 조건에 맞는 뉴스는 없습니다...</h4>}
      {newsList.map((news) => (
        <NewsCard key={news._id} news={news} />
      ))}
    </div>
  );
}

export default NewsList;
