import path from "path";

export const dbConfig = {
  // Use a persistent file-based SQLite database
  databasePath: path.resolve(process.cwd(), "queue.db"),
  port: parseInt(process.env.PORT || "5000", 10),
};
