import cors from "cors";
import express from "express";
import { newsRouter } from "./routers/newsRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(
  cors({
    origin: ["http://34.64.100.131:3000", "http://34.64.100.131:3001"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 뉴스 목록 API 입니다.");
});

app.use(newsRouter);
app.use(errorMiddleware);

export { app };
