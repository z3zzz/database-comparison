import NewsCard from "../NewsCard";
import "./NewsList.css";

function NewsList({ newsList, isPending }) {
  const style = isPending ? "newscard-container pending" : "newscard-container";

  return (
    <div className={style}>
      {newsList.map((news) => (
        <NewsCard key={news._id} news={news} />
      ))}
    </div>
  );
}

export default NewsList;
