import { NewsModel } from "../schemas/news";

interface INewsFilter {
  date: string;
  text_headline: string;
  text_company: string;
  category: string;
  startIndex: number;
  endIndex: number;
}

interface INewses {
  data: Array<any>;
  totalCount: number;
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
    const filter_date =
      date === "all" ? {} : { $text: { $search: `\"${date}\"` } };
    const filter_headline =
      text_headline === "all"
        ? {}
        : { text_headline: { $regex: text_headline } };
    const filter_company =
      text_company === "all" ? {} : { text_company: { $regex: text_company } };
    const filter_category =
      category === "all" ? {} : { category: { $regex: category } };

    const skip = startIndex;
    const limit = endIndex - startIndex;

    const filter = {
      ...filter_date,
      ...filter_headline,
      ...filter_company,
      ...filter_category,
    };

    console.log({ filter });

    const result = await NewsModel.aggregate([
      { $match: filter },
      {
        $facet: {
          totalData: [{ $match: {} }, { $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    console.dir(result);

    const newses: INewses = {
      data: result[0].totalData,
      totalCount: result[0].totalCount[0]?.count ?? 0,
    };
    return newses;
  }
}

export { News };
