import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gastoRoutes from "./routes/gastoRouter"
import tarefaRouter from "./routes/tarefaRouter"
import mercadoRoutes from "./routes/mercadoRouter"
import loginRoutes from "./routes/loginRouter"

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://blue-eyes-front.vercel.app" 
  ],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
}));
app.use(express.json());

const PORT = process.env.PORT;

app.use("/gasto", gastoRoutes);
app.use("/tarefa", tarefaRouter)
app.use("/mercado", mercadoRoutes);
app.use("/login", loginRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
