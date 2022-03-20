import mysql from "mysql2";
import { News } from "./models/News";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
});

pool.getConnection((error, connection) => {
  if (error) {
    console.error("MongoDB 연결에 실패하였습니다...\n" + error);
    throw error;
  }

  console.log("정상적으로 MongoDB 서버에 연결되었습니다.");
  connection.release();
});

export { pool };
export { News as NewsMysql };
