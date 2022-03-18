import "./NewsList.css";

function NewsList({ newsList }) {
  return (
    <div className="container">
      <h2>뉴스리스트</h2>
      <ol>
        {newsList.map((news) => (
          <li key={news._id}>{news.text_headline}</li>
        ))}
      </ol>
    </div>
  );
}

export default NewsList;
