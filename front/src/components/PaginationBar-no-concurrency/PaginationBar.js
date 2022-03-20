import { useState } from "react";
import "./PaginationBar.css";

function PaginationBar({ setNewsQueryObject, isPending, startTransition }) {
  const [page, setPage] = useState(1);
  const isPageLowerThanFour = page < 4;

  const handleLeftArrowClick = () => {
    const pageNum = page - 1;

    startTransition(() => {
      setPage(pageNum);
      setNewsQueryObject((obj) => ({ ...obj, page: pageNum }));
    });
  };
  const handleRightArrowClick = () => {
    const pageNum = page + 1;

    startTransition(() => {
      setPage(pageNum);
      setNewsQueryObject((obj) => ({ ...obj, page: pageNum }));
    });
  };

  const handleNumClick = (e) => {
    const pageNum = parseInt(e.target.value);

    startTransition(() => {
      setPage(pageNum);
      setNewsQueryObject((obj) => ({ ...obj, page: pageNum }));
    });
  };

  const buttonClass = (pageNum) =>
    pageNum === page ? "page-button page-button-center" : "page-button";

  return (
    <div className="container-pagination-bar">
      <button
        disabled={isPending}
        className="page-button"
        onClick={handleLeftArrowClick}
      >
        &lt;
      </button>
      {isPageLowerThanFour &&
        [1, 2, 3, 4, 5].map((pageNum) => (
          <button
            disabled={isPending}
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
            disabled={isPending}
            key={pageNum}
            className={buttonClass(pageNum)}
            value={pageNum}
            onClick={handleNumClick}
          >
            {pageNum}
          </button>
        ))}
      <button
        disabled={isPending}
        className="page-button"
        onClick={handleRightArrowClick}
      >
        &gt;
      </button>
    </div>
  );
}

export default PaginationBar;
