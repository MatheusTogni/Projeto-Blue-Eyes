import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gastoRoutes from "./routes/gastoRouter"
import tarefaRouter from "./routes/tarefaRouter"

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], 
}));
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.use("/gasto", gastoRoutes);
app.use("/tarefa", tarefaRouter)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
