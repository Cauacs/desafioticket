import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

export async function connectDb() {
  const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  });

  await client.connect();
  return client;
}
export async function createTables(db) {
  try {
    // Tabela players
    await db.query(`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela tournaments
    await db.query(`
      CREATE TABLE IF NOT EXISTS tournaments (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,  -- eliminatory or roundRobin
        num_players INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela matches
    await db.query(`
        CREATE TABLE IF NOT EXISTS matches (
          id SERIAL PRIMARY KEY,
          tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
          round INTEGER,  -- Número da rodada (somente para eliminatória)
          player1_id INTEGER REFERENCES players(id),
          player2_id INTEGER REFERENCES players(id),
          winner_id INTEGER REFERENCES players(id),  -- Pode ser NULL se o jogo ainda não foi jogado
          played_at TIMESTAMP
        );
      `);

    // Tabela results
    await db.query(`
        CREATE TABLE IF NOT EXISTS results (
          id SERIAL PRIMARY KEY,
          match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
          player_id INTEGER REFERENCES players(id),
          score INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    console.log("Tabelas criadas com sucesso.");
  } catch (error) {
    console.error("Erro ao criar tabelas", error);
  }
}
