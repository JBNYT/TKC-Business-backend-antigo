const express = require("express");
const Escala = require("../models/escala");

const router = express.Router();

// Rota para receber dados do site de predominância
router.post("/", async (req, res) => {
  const { nome, email, telefone, resultados, idade, sexo } = req.body;

  try {
    let escala;

    // Verifica se o email já existe no banco de dados
    const emailExistente = await Escala.findOne({ email });

    if (emailExistente) {
      // Atualize o registro existente com os novos dados
      emailExistente.nome = nome;
      emailExistente.telefone = telefone;
      emailExistente.resultados = resultados;
      emailExistente.idade = idade;
      emailExistente.sexo = sexo;

      // Salve o registro atualizado
      escala = await emailExistente.save();

      res.status(200).json({
        message: "Dados de escala de propósito atualizados com sucesso!",
        escala,
      });
    } else {
      // Crie um novo documento Escala com os dados recebidos
      escala = new Escala({
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
        message: "Dados de escala de propósito salvos com sucesso!",
        escala: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
