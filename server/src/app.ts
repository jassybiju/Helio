import express from "express";

export const app = express();

app.get("/health", (req, res) => {
  console.log("Api is health");
  res.json({ health_status: "API is healthy" });
});
