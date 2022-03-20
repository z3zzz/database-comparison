import { Schema, model } from "mongoose";

const NewsSchema = new Schema(
  {
    time: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    text_headline: {
      type: String,
      required: true,
    },
    text_company: {
      type: String,
      required: true,
    },
    context_url: {
      type: String,
      required: true,
    },
    label: {
      type: Array,
      required: false,
    },
  },
  {
    collection: "all",
    timestamps: true,
  }
);

const NewsModel = model("news", NewsSchema);

export { NewsModel };
