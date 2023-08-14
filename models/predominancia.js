const mongoose = require("mongoose");

const predominanciaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  resultados: {
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
});

module.exports = mongoose.model("Predominancia", predominanciaSchema);
