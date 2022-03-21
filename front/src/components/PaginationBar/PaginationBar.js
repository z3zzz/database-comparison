import "./PaginationBar.css";

function PaginationBar({
  newsQueryObject,
  setNewsQueryObject,
  fetchNewsList,
  page,
  setPage,
  maxPage,
}) {
  const showFiveBtn = maxPage >= 5;
  const isPageCloseToStart = page < 3;
  const isPageCloseToEnd = maxPage - page < 2;
  const isPageStart = page === 1;
  const isPageEnd = page === maxPage;

  console.log({ page, maxPage });

  const doPageTransition = (pageNum) => {
    const queryObj = { ...newsQueryObject, page: pageNum };
    setNewsQueryObject(queryObj);
    fetchNewsList(queryObj, false);
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

  const disableCurrentPage = (pageNum) => (pageNum === page ? true : false);

  return (
    <div className="container-pagination-bar">
      <button
        className="page-button"
        onClick={handleLeftArrowClick}
        disabled={isPageStart}
      >
        &lt;
      </button>
      {showFiveBtn &&
        isPageCloseToStart &&
        [1, 2, 3, 4, 5].map((pageNum) => (
          <button
            key={pageNum}
            className={buttonClass(pageNum)}
            value={pageNum}
            onClick={handleNumClick}
            disabled={disableCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}

      {showFiveBtn &&
        !isPageCloseToStart &&
        isPageCloseToEnd &&
        [maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage].map(
          (pageNum) => (
            <button
              key={pageNum}
              className={buttonClass(pageNum)}
              value={pageNum}
              onClick={handleNumClick}
              disabled={disableCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          )
        )}

      {showFiveBtn &&
        !isPageCloseToStart &&
        !isPageCloseToEnd &&
        [page - 2, page - 1, page, page + 1, page + 2].map((pageNum) => (
          <button
            key={pageNum}
            className={buttonClass(pageNum)}
            value={pageNum}
            onClick={handleNumClick}
            disabled={disableCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}

      {!showFiveBtn &&
        [1, 2, 3, 4].slice(0, maxPage).map((pageNum) => (
          <button
            key={pageNum}
            className={buttonClass(pageNum)}
            value={pageNum}
            onClick={handleNumClick}
            disabled={disableCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}

      <button
        className="page-button"
        onClick={handleRightArrowClick}
        disabled={isPageEnd}
      >
        &gt;
      </button>
    </div>
  );
}

export default PaginationBar;
