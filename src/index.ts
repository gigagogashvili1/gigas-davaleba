import express from "express";
import tasksRoutes from "./routes";

const app = express();

app.use(tasksRoutes);

app.listen(3003);
