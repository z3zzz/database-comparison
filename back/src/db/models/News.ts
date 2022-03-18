import { NewsModel } from "../schemas/news";

class News {
  static async getNewsListByIndex({
    startIndex,
    endIndex,
  }: {
    startIndex: number;
    endIndex: number;
  }) {
    const skip = startIndex;
    const limit = endIndex - startIndex;

    const filter = {};
    const projection = [
      "_id",
      "time",
      "category",
      "text_headline",
      "text_company",
      "context_url",
    ];
    const options = { skip, limit };

    const newsList = await NewsModel.find(filter, projection, options);
    return newsList;
  }
}

export { News };
