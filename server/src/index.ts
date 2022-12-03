import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import Deck from "./models/Deck";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

const db = mongoose.connect(process.env.MONGO_URL ?? "").then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});
