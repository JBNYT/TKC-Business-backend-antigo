const express = require("express");
const Predominancia = require("../models/predominancia");

const router = express.Router();

// Rota para receber dados do site de predominância
router.post("/", async (req, res) => {
  const { nome, email, telefone, resultados, idade, sexo } = req.body;

  try {
    let predominancia;

    // Verifica se o email já existe no banco de dados
    const emailExistente = await Predominancia.findOne({ email });

    if (emailExistente) {
      // Atualize o registro existente com os novos dados
      emailExistente.nome = nome;
      emailExistente.telefone = telefone;
      emailExistente.resultados = resultados;
      emailExistente.idade = idade;
      emailExistente.sexo = sexo;

      // Salve o registro atualizado
      predominancia = await emailExistente.save();
    } else {
      // Crie um novo documento Predominancia com os dados recebidos
      predominancia = new Predominancia({
        nome,
        email,
        telefone,
        resultados,
        idade,
        sexo,
      });

      // Salve o documento no banco de dados
      predominancia = await predominancia.save();
    }

    res.status(201).json({
      message: "Dados de predominância salvos com sucesso!",
      predominancia,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;

