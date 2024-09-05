import { EliminTournament } from "./elimination.js";
import { robinTournament } from "./round-robin.js";
import { isPowerOfTwo, populatePlayers } from "./utils.js";
import express from "express";
import cors from "cors";
import pg from "pg";
import { connectDb, createTables } from "./database.js";

const app = express();
app.use(cors());
const port = 4000;
const client = await connectDb();
await createTables(client);
await client.end();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/elim", (req, res) => {
  //check for power of 2
  if (!isPowerOfTwo(parseInt(req.query.players))) {
    return res.status(400).json({
      msg: "For elimination tournaments the number of players must be in the power of 2",
    });
  }
  const players = populatePlayers(parseInt(req.query.players));
  const elim = new EliminTournament(players);
  elim.simulate();
  return res.json(elim.results);
});

app.get("/robin", (req, res) => {
  const players = populatePlayers(parseInt(req.query.players));
  const robin = new robinTournament(players);
  res.json(robin.getCurrentMatches());
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
