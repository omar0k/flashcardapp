import { Request, Response } from "express";
import Deck from "../models/Deck";

async function getDecksController(req: Request, res: Response) {
  const decks = await Deck.find();
  res.json(decks);
}
async function deleteDeckController(req: Request, res: Response) {
  const deck = await Deck.findByIdAndDelete(req.params.deckId);
  res.json(deck);
}

async function createDeckController(req: Request, res: Response) {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
}
async function createCardForDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send("no deck of this id exists");
  const { text } = req.body;
  deck.cards.push(text);
  await deck.save();
  res.json(deck);
}
async function getDeckController(req: Request, res: Response) {
  const { deckId } = req.params;
  const deck = Deck.findById(deckId);
  res.json(deck);
}
export {
  getDecksController,
  deleteDeckController,
  createDeckController,
  getDeckController,
  createCardForDeckController,
};
