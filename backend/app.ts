import express from "express";
import customerRoutes from "./routes/customerRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Custom CORS middleware to support standalone frontend and backend communication
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Mount routes
app.use("/api/customers", customerRoutes);

// Register centralized error handling middleware
app.use(errorHandler);

export default app;
