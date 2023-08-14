const express = require("express");
const router = express.Router();
const Formulario = require("../models/formulario");

// Rota para enviar o formulário
router.post("/", async (req, res) => {
  const { nome, email, telefone, idade, sexo, resultados } = req.body;

  try {
    // Verifica se o email já existe no banco de dados
    const emailExistente = await Formulario.findOne({ email });

    if (emailExistente) {
      return res.status(400).json({ error: "Este email já está cadastrado." });
    }

    // Cria o objeto do formulário
    const formulario = new Formulario({
      nome,
      email,
      telefone,
      idade,
      sexo,
      resultados,
    });

    // Salva os dados no banco de dados
    await formulario.save();

    res.status(200).json({ message: "Dados salvos com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Ocorreu um erro ao salvar os dados." });
  }
});

module.exports = router;
