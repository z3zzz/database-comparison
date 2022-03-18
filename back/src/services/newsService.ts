import { News } from "../db";

interface INews {
  time: string;
  category: string;
  text_headline: string;
  text_company: string;
  context_url: string;
  label: Array<number>;
}

class newsService {
  static async getNewsList({ length, page }: { length: number; page: number }) {
    const startIndex = length * (page - 1);
    const endIndex = length * page;

    const newsList: Array<INews> = await News.getNewsListByIndex({
      startIndex,
      endIndex,
    });

    if (newsList.length === 0) {
      const errorMessage = "해당 페이지에 속한 뉴스는 없습니다!";
      return { errorMessage };
    }

    return newsList;
  }
}

export { newsService };
