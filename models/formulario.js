const mongoose = require("mongoose");

const formularioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  resultados: {
    type: [String],
    required: true,
  },
});

const Formulario = mongoose.model("Formulario", formularioSchema);

module.exports = Formulario;
