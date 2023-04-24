const mongoose = require('mongoose');

const Tarefa = mongoose.model('Tarefas', {
    nome: String,
    funcionario_responsavel: String,
    is_done: Boolean,
    date_done: Date
});

module.exports = Tarefa