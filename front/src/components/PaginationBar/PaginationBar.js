import { useState } from "react";
import "./PaginationBar.css";

function PaginationBar({ setNewsQueryObject }) {
  const [page, setPage] = useState();
  const isPageLowerThanFour = page < 4;
  const handleClick = (e) => {
    const page = e.target.value;
    console.log({ page });
    setNewsQueryObject((obj) => ({ ...obj, page }));
  };

  return (
    <div className="container-pagination-bar">
      {isPageLowerThanFour &&
        [1, 2, 3, 4, 5].map((page) => (
          <button className="page-button" value={page} onClick={handleClick}>
            {page}
          </button>
        ))}
      {!isPageLowerThanFour &&
        [page - 2, page - 1, page, page + 1, page + 2].map((page) => (
          <button className="page-button" value={page} onClick={handleClick}>
            {page}
          </button>
        ))}
    </div>
  );
}

export default PaginationBar;
