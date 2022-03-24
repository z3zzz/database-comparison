import "./NewsCard.css";

function NewsCard({ news }) {
  const title = news.text_headline || news.title;
  const company = news.text_company || news.company;
  const category = news.category;
  const date = news.date_string || news.date.split("T")[0];
  const link = news.context_url || "#";

  return (
    <div className="news-card">
      <div className="news news-title">제목</div>
      <div className="news news-title">{title}</div>
      <div className="news news-company">신문사</div>
      <div className="news news-company">{company}</div>
      <div className="news news-etc">분류</div>
      <div className="news news-etc">{category}</div>
      <div className="news news-etc">날짜</div>
      <div className="news news-etc">{date}</div>
      <a href={link} target="_blank" rel="noreferrer">
        <span className="news-link"></span>
      </a>
    </div>
  );
}

export default NewsCard;
