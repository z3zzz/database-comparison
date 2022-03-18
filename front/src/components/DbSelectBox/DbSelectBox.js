import "./DbSelectBox.css";

function DbSelectBox({ setNewsQuery }) {
  const handleClick = (e) => {
    const dbType = e.target.value;
    console.log(dbType);
  };

  return (
    <div className="container-db-select">
      <button className="db-item mongodb" value="mongodb" onClick={handleClick}>
        MongoDB
      </button>
      <button className="db-item mysql" value="mysql" onClick={handleClick}>
        MySQL
      </button>
      <button
        className="db-item postgresql"
        value="postgresql"
        onClick={handleClick}
      >
        PostgreSQL
      </button>
    </div>
  );
}

export default DbSelectBox;
