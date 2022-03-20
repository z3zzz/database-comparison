import { useState } from "react";
import "./NewsSelectBox.css";
import NewsSelectItem from "../NewsSelectItem";

function NewsSelectBox({
  newsQueryObject,
  setNewsQueryObject,
  startTransition,
  fetchNewsList,
}) {
  const [selectObj, setSelectObj] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryObj = { ...newsQueryObject, ...selectObj };

    setNewsQueryObject(queryObj);
    startTransition(() => {
      fetchNewsList(queryObj);
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="container-news-select">
      <div className="title-news-select">어떤 뉴스를 원하시나요?</div>
      <form className="form-news-select">
        <NewsSelectItem
          label="제목"
          field="title"
          isInput
          setSelectObj={setSelectObj}
        />
        <NewsSelectItem
          label="신문사"
          field="company"
          isInput
          setSelectObj={setSelectObj}
        />
        <NewsSelectItem
          label="분류"
          field="category"
          isInput
          setSelectObj={setSelectObj}
        />
        <NewsSelectItem
          label="날짜"
          field="date"
          isDate
          setSelectObj={setSelectObj}
        />
        <NewsSelectItem
          label="목록 길이"
          field="length"
          isNumber
          setSelectObj={setSelectObj}
        />
        <button className="button-news-select" onClick={handleSubmit}>
          뉴스검색
        </button>
      </form>
    </div>
  );
}

export default NewsSelectBox;
