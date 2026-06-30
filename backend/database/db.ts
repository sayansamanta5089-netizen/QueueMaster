import Database from "better-sqlite3";
import { dbConfig } from "../config/dbConfig";

// Create and initialize database connection
const db = new Database(dbConfig.databasePath, { verbose: console.log });

// Enable foreign key support and create the customers table if it doesn't exist
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('Waiting', 'Being Served', 'Completed')),
    createdAt TEXT NOT NULL
  );
`);

export default db;
