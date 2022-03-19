import "./NewsCard.css";

function NewsCard({ news }) {
  const title = news.text_headline
  const company = news.text_company
  const category = news.category
  const time = news.time

  return (
    <div className="news-card">
      <div className="news-title">제목</div>
      <div className="news-title">{title}</div>
      <div className="news-company">신문사</div>
      <div className="news-company">{company}</div>
      <div className="news-etc">분류, 날짜</div>
      <div className="news-etc">{`${category}   ${time}`}</div>
    </div>
  );
}

export default NewsCard;
