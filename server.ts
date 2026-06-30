import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import app from "./backend/app";

const PORT = 3000;

async function startServer() {
  // Serve Vite frontend
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Mount Vite's development asset serving middlewares
    app.use(vite.middlewares);
  } else {
    // In production, serve the built files directly from the /dist folder
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`QueueMaster unified full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
