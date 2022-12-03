import express, { Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import Deck from "./models/Deck";

const PORT = 5000;

const app = express();


app.use(express.json());
app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

const db = mongoose
  .connect(
    "mongodb+srv://omar:Ts2SBVLKhCZ3kCMJ@cluster0.s7js8nq.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`Listening on port ${PORT}`);
    app.listen(PORT);
  });
