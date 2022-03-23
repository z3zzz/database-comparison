import mysql from "mysql2";
import { News } from "./News";

const poolPrepare = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

poolPrepare.getConnection((error: any, connection: any) => {
  if (error) {
    console.error("Mysql 연결에 실패하였습니다...\n" + error);
    throw error;
  }

  console.log("정상적으로 Mysql서버에 연결되었습니다.", {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
  });
});

const pool = poolPrepare.promise();

export { pool };
export { News as NewsMysql };
