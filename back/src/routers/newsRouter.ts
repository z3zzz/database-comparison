import { Router } from "express";
import { newsService } from "../services/newsService";

const newsRouter = Router();

interface IQuery {
  category: string;
  company: string;
  date: string;
  dbType: string;
  title: string;
  page: string;
  length: string;
}

newsRouter.get("/api/newslist", async function (req, res, next) {
  try {
    const { category, company, date, dbType, title, page, length } =
      req.query as unknown as IQuery;

    const newsList = await newsService.getNewsList({
      category: category ? category : "all",
      company: company ? company : "all",
      date: date ? date : "all",
      dbType: dbType ? dbType : "mongodb",
      title: title ? title : "all",
      page: parseInt(page),
      length: parseInt(length),
    });

    res.status(200).json(newsList);
  } catch (error) {
    next(error);
  }
});

export { newsRouter };
