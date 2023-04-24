const mongoose = require('mongoose');

const Funcionario = mongoose.model('Funcionario', {
    nome: String,
    email: String,
    password: String,
});

module.exports = Funcionario;