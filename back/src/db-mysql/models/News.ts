import { pool } from "..";

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

    const filter = {
      date,
      text_headline: { $regex: text_headline },
      text_company: { $regex: text_company },
      category,
    };

    const projection = [
      "_id",
      "date",
      "category",
      "text_headline",
      "text_company",
      "context_url",
    ];
    const options = { skip, limit };

    pool;
    const newsList = await NewsModel.find(filter, projection, options);
    return newsList;
  }
}

export { News };
