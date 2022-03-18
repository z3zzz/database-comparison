import { Router } from "express";
import { newsService } from "../services/newsService";

const newsRouter = Router();

interface IQuery {
  page: string;
  length: string;
}

newsRouter.get("/api/newslist", async function (req, res, next) {
  try {
    const { page, length } = req.query as unknown as IQuery;

    // 위 데이터를 유저 db에 추가하기
    const newsList = await newsService.getNewsList({
      page: parseInt(page),
      length: parseInt(length),
    });

    res.status(200).json(newsList);
  } catch (error) {
    next(error);
  }
});

export { newsRouter };
