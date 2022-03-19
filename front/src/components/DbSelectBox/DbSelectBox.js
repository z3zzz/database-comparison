import { useRef } from "react";
import "./DbSelectBox.css";

function DbSelectBox({ setNewsQuery }) {
  const mongodbRef = useRef();
  const mysqlRef = useRef();
  const postgresqlRef = useRef();
  const refs = [mongodbRef, mysqlRef, postgresqlRef];

  const handleClick = (e) => {
    const dbType = e.target.value;
    console.log(dbType);

    refs.forEach((ref) => {
      if (ref.current.value === dbType) {
        ref.current.classList.add("db-item-selected");
      } else {
        ref.current.classList.remove("db-item-selected");
      }
    });
  };

  return (
    <div className="container-db-select">
      <button
        className="db-item mongodb"
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
        value="postgresql"
        ref={postgresqlRef}
        onClick={handleClick}
      >
        PostgreSQL
      </button>
    </div>
  );
}

export default DbSelectBox;
