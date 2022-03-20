import { NewsMongoDb } from "../db-mongo";

interface INews {
  _id: string;
  date: string;
  category: string;
  text_headline: string;
  text_company: string;
  context_url: string;
  label: Array<number>;
}

interface IQuery {
  category: string;
  company: string;
  date: string;
  dbType: string;
  title: string;
  page: number;
  length: number;
}

class newsService {
  static async getNewsList({
    category,
    company,
    date,
    dbType,
    title,
    length,
    page,
  }: IQuery) {
    const text_headline = title;
    const text_company = company;

    const startIndex = length * (page - 1);
    const endIndex = length * page;

    let newsList: Array<INews> = [];

    if (dbType === "mongodb") {
      newsList = await NewsMongoDb.getNewsList({
        date,
        text_headline,
        text_company,
        category,
        startIndex,
        endIndex,
      });
    }

    return newsList;
  }
}

export { newsService };
