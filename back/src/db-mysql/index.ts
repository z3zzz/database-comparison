import mysql from "mysql2";
import prompt from "password-prompt";
import { News } from "./News";

const pw: string = await prompt("mysql password: ");

const poolPrepare = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: pw,
  database: process.env.MYSQL_DB,
});

poolPrepare.getConnection((error: any, connection: any) => {
  if (error) {
    console.error("Mysql 연결에 실패하였습니다...\n" + error);
    throw error;
  }

  console.log("정상적으로 Mysql서버에 연결되었습니다.\n", {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
  });
});

const pool = poolPrepare.promise();

export { pool };
export { News as NewsMysql };
