const express = require("express");
const mongoose = require("mongoose");
const formularioRoutes = require("../routes/formularioRoutes");
const predominanciaRoutes = require("../routes/predominanciaRoutes"); // Altere o nome da rota aqui
const escalaRoutes = require("../routes/escalaRoutes");

const app = express();
const PORT = 80;

// Conexão com o banco de dados MongoDB
mongoose
  .connect(
    "mongodb+srv://tecnologia:kdd26Jb81qh5wE1V@tkcbusiness.ptielwz.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida com sucesso!");
    // Inicia o servidor após a conexão com o banco de dados
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o MongoDB:", error);
  });

// Middleware para processar requisições JSON
app.use(express.json());

// Middleware para adicionar o cabeçalho CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.tkcbusiness.com.br");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});



// Rotas do formulário
app.use("/formulario", formularioRoutes);

// Nova rota (predominancia)
app.use("/predominancia", predominanciaRoutes);

app.use("/escala", escalaRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API do Formulário");
});
