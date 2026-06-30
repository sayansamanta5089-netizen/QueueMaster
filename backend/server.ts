import app from "./app";
import { dbConfig } from "./config/dbConfig";

const PORT = dbConfig.port;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`QueueMaster Backend running on http://0.0.0.0:${PORT}`);
});
