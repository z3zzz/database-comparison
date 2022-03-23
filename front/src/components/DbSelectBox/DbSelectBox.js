import { useRef } from "react";
import "./DbSelectBox.css";

function DbSelectBox({
  newsQueryObject,
  setNewsQueryObject,
  fetchNewsList,
}) {
  const mongodbRef = useRef();
  const mysqlRef = useRef();
  const postgresqlRef = useRef();
  const refs = [mongodbRef, mysqlRef, postgresqlRef];

  const handleClick = (e) => {
    e.preventDefault();
    const dbType = e.target.value;
    const queryObj = { ...newsQueryObject, dbtype: dbType };

    refs.forEach((ref) => {
      if (ref.current.value === dbType) {
        ref.current.classList.add("db-item-selected");
      } else {
        ref.current.classList.remove("db-item-selected");
      }
    });

    setNewsQueryObject(queryObj);
    fetchNewsList(queryObj);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container-db-select">
      <button
        className="db-item db-item-selected mongodb"
        value="mongodb"
        ref={mongodbRef}
        onClick={handleClick}
      >
        MongoDB
      </button>
      <button
        className="db-item mysql"
        value="mysql"
        ref={mysqlRef}
        onClick={handleClick}
      >
        MySQL
      </button>
      <button
        className="db-item postgresql"
        value=""
        ref={postgresqlRef}
        onClick={handleClick}
      >
        PostgreSQL
      </button>
    </div>
  );
}

export default DbSelectBox;
