import { pool } from ".";

interface INewsFilter {
  date: string;
  text_headline: string;
  text_company: string;
  category: string;
  startIndex: number;
  endIndex: number;
}

class News {
  static async getNewsList({
    date,
    text_headline,
    text_company,
    category,
    startIndex,
    endIndex,
  }: INewsFilter) {
    const skip = startIndex;
    const limit = endIndex - startIndex;

    const isDateAll = date === "all";
    const isTitleAll = text_headline === "all";
    const isCompanyAll = text_company === "all";
    const isCategoryAll = category === "all";

    const dateCondition = isDateAll ? `` : `WHERE date = "${date}"`;
    const titleCondition = isTitleAll
      ? ``
      : `AND title LIKE "%${text_headline}%"`;
    const companyCondition = isCompanyAll
      ? ``
      : `AND company LIKE "%${text_company}%"`;
    const categoryCondition = isCategoryAll
      ? ``
      : `AND category LIKE "${category}"`;

    const skipCondition = `LIMIT ${skip}, ${limit}`;

    const query = `SELECT * FROM newslist ${dateCondition} ${titleCondition} ${companyCondition} ${categoryCondition} ${skipCondition}`;

    const [rows, fields] = await pool.query(query);
    console.log(rows);

    return rows;
  }
}

export { News };