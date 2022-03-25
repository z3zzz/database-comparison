import { pool } from ".";

interface INewsFilter {
  date: string;
  text_headline: string;
  text_company: string;
  category: string;
  startIndex: number;
  endIndex: number;
}

interface INews {
  id: number;
  date: string;
  category: string;
  title: string;
  company: string;
}

interface ICount {
  newsCount: number;
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

    const dateCondition = isDateAll ? `WHERE id > 0` : `WHERE date = "${date}"`;
    const titleCondition = isTitleAll
      ? ``
      : `AND title LIKE "%${text_headline}%"`;
    const companyCondition = isCompanyAll
      ? ``
      : `AND company LIKE "%${text_company}%"`;
    const categoryCondition = isCategoryAll
      ? ``
      : `AND category LIKE "%${category}%"`;

    const skipCondition = `LIMIT ${skip}, ${limit}`;

    const newsQuery = `SELECT * FROM newslist ${dateCondition} ${titleCondition} ${companyCondition} ${categoryCondition} ${skipCondition}`;

    console.log();
    console.log("MySQL acces with: ", { newsQuery });

    const [newsRows, fields] = await pool.query(newsQuery);
    const newsList: Array<INews> = JSON.parse(JSON.stringify(newsRows)) || [];

    const countQuery = `SELECT COUNT(*) as newsCount FROM newslist ${dateCondition} ${titleCondition} ${companyCondition} ${categoryCondition}`;
    const [countRows, fields2] = await pool.query(countQuery);
    const countList: Array<ICount> = JSON.parse(JSON.stringify(countRows));
    const count = countList[0].newsCount;

    console.log("MySQL query result: ", { count });

    return { data: newsList, totalCount: count };
  }
}

export { News };
