import { NewsMongoDb } from "../db-mongo";
import { NewsMysql } from "../db-mysql";

interface INewsMongodb {
  _id: string;
  date: string;
  category: string;
  text_headline: string;
  text_company: string;
  context_url: string;
  label: Array<number>;
}

interface INewsesMongodb {
  data: Array<INewsMongodb>;
  totalCount: number;
}

interface INewsMysql {
  id: number;
  date: string;
  category: string;
  title: string;
  company: string;
}

interface INewsesMysql {
  data: Array<INewsMysql>;
  totalCount: number;
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

    let newses: INewsesMongodb | INewsesMysql;

    if (dbType === "mongodb") {
      newses = await NewsMongoDb.getNewsList({
        date,
        text_headline,
        text_company,
        category,
        startIndex,
        endIndex,
      });
    }

    if (dbType === "mysql") {
      newses = await NewsMysql.getNewsList({
        date,
        text_headline,
        text_company,
        category,
        startIndex,
        endIndex,
      });
    }

    // @ts-ignore
    return newses;
  }
}

export { newsService };
