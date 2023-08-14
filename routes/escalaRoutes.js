const express = require("express");
const Escala = require("../models/escala");

const router = express.Router();

// Rota para receber dados do site de predominância
router.post("/", async (req, res) => {
  const { nome, email, telefone, resultados, idade, sexo } = req.body;

  try {
    // Verifica se o email já existe no banco de dados
    const emailExistente = await Escala.findOne({ email });

    if (emailExistente) {
      return res.status(400).json({ error: "Este email já está cadastrado." });
    }

    // Crie um novo documento Predominancia com os dados recebidos
    const escala = new Escala({
      nome,
      email,
      telefone,
      resultados,
      idade,
      sexo,
    });

    // Salve o documento no banco de dados
    const result = await escala.save();

    res.status(201).json({
      message: "Dados de escala de proposito salvos com sucesso!",
      predominancia: result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
