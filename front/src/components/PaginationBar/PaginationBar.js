import { useState } from "react";
import "./PaginationBar.css";

function PaginationBar({
  newsQueryObject,
  setNewsQueryObject,
  startTransition,
  fetchNewsList,
  page,
  setPage
}) {
  const isPageLowerThanFour = page < 4;
  const doPageTransition = (pageNum) => {
    const queryObj = { ...newsQueryObject, page: pageNum };
    setNewsQueryObject(queryObj);
    startTransition(() => {
      fetchNewsList(queryObj, false);
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLeftArrowClick = () => {
    const pageNum = page - 1;
    setPage(pageNum);
    doPageTransition(pageNum);
  };

  const handleRightArrowClick = () => {
    const pageNum = page + 1;
    setPage(pageNum);
    doPageTransition(pageNum);
  };

  const handleNumClick = (e) => {
    const pageNum = parseInt(e.target.value);
    setPage(pageNum);
    doPageTransition(pageNum);
  };

  const buttonClass = (pageNum) =>
    pageNum === page ? "page-button page-button-center" : "page-button";

  return (
    <div className="container-pagination-bar">
      <button className="page-button" onClick={handleLeftArrowClick}>
        &lt;
      </button>
      {isPageLowerThanFour &&
        [1, 2, 3, 4, 5].map((pageNum) => (
          <button
            key={pageNum}
            className={buttonClass(pageNum)}
            value={pageNum}
            onClick={handleNumClick}
          >
            {pageNum}
          </button>
        ))}
      {!isPageLowerThanFour &&
        [page - 2, page - 1, page, page + 1, page + 2].map((pageNum) => (
          <button
            key={pageNum}
            className={buttonClass(pageNum)}
            value={pageNum}
            onClick={handleNumClick}
          >
            {pageNum}
          </button>
        ))}
      <button className="page-button" onClick={handleRightArrowClick}>
        &gt;
      </button>
    </div>
  );
}

export default PaginationBar;
