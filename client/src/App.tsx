import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks, TDeck } from "./api/getDecks";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);
  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title !== "") {
      const deck = await createDeck(title);
      setDecks([...decks, deck]);
      setTitle("");
    }
  };
  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);
  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  return (
    <div className="App">
      <div className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </div>
      <form onSubmit={handleCreateDeck}>
        <label>Deck Title</label>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
