const express = require('express');
const app = express();
const mongoose = require('mongoose');
const funcionarioController = require('./controllers/funcionarioController.js');
const tarefaController = require('./controllers/tarefaController');

app.use(express.json());
    
app.use('/funcionario', funcionarioController);
app.use('/tarefa', tarefaController);

mongoose.connect('mongodb+srv://rafaelmorenosax:I5tiC30kIYSsuvBR@apitestemongodb.jqi5v1r.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(3000, () => {
            console.log('Conectado ao mongoDB');
            console.log('Servidor iniciado na porta 3000');
        })
    })
    .catch((err) => {
        console.log(err);
    });
