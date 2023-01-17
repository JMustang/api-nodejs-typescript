import express from "express";
import cors from "cors";
import usersRouter from "./routers/users-router";

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Host do saervidor
const HOSTNAME = process.env.HOSTNAME || "http://localhost";

// App Express
const app = express();

//JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint raiz
app.get("/", (req, res) => {
  res.send("Bem-vindo!");
});

// Cors
app.use(
  cors({
    origin: ["http://localhost:3300", '*'],
  })
);

// Rotas
app.use("/api/v1/", usersRouter);

// Resposta padrao para qualquer outra requisicao
app.use((req, res) => {
  res.status(404);
});

// Inicia o server
app.listen(PORT, () => {
  console.log(`Server listening on port ${HOSTNAME}:${PORT}`);
});
