const express = require('express');
const router = express.Router();

const Tarefa = require('../models/Tarefa');

router.post('/', async (req, res) => {

    const { nome, funcionario_responsavel, is_done, idTarefa, date_done} = req.body;

    const tarefa = { 
        nome, funcionario_responsavel, is_done, idTarefa, date_done
    }
    try { 
        await Tarefa.create(tarefa);
        res.status(201).json(tarefa);
    }
    catch (error) {
        res.status(500).json({error: error});
    }
});

    router.get('/', async (req, res) => {
        try{
            const tarefa = await Tarefa.find();
            res.status(200).json(tarefa);
        }
        catch (error){
            res.status(500).json({error: error});
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const tarefa = await Tarefa.findOne({ _id: req.params.id });
            if (!tarefa) {
                res.status(422).json({ mensagem: "Tarefa não encontrada" });
                return
            }
            res.status(200).json(tarefa);
        }
         catch (error) {
            res.status(500).json({ error: error });
        }
    });
    
    router.get('/data/:date_done', async (req, res) => {
        try {
            const tarefa = await Tarefa.findOne({date_done: req.params.date_done });
            if (!tarefa) {
                res.status(422).json({ mensagem: "Tarefa não encontrada" });
                return
            }
            res.status(200).json(tarefa);
        }
         catch (error) {
            res.status(500).json({ error: error });
        }
    });


    router.put('/:id', async (req, res) => { // mudar responsavel
        const {idFuncionario} = req.body;
        try { 
            const tarefa = await Tarefa.findOne({_id: req.params.id});
            if(!tarefa) {
                res.status(422).json({ mensagem: "Tarefa não encontrada"});
                return
            }
            tarefa.funcionario_responsavel = idFuncionario;

            const updateTarefa =  await Tarefa.updateOne({_id: req.params.id}, tarefa);

            if (updateTarefa.matchedCount === 0) {
                res.status(422).json({ mensagem: "Funcionário não encontrado" });
                return
            }
            res.status(200).json(tarefa);
        }
        catch (error) {
            res.status(500).json({ error : error})
        }
    });

    router.put('/concluir/:id', async (req, res) => { // finalizar tarefa
        const {tarefaAnswer} = req.body;
        try { 
            const tarefa = await Tarefa.findOne({_id: req.params.id});
            if(!tarefa) {
                res.status(422).json({ mensagem: "Tarefa não encontrada"});
                return
            }
            if(tarefaAnswer){
                var date = new Date();  
                var ano = date.getFullYear();
                var mes = date.getMonth()+ 1;
                var dia = date.getDate();
                tarefa.date_done = ano + "-" + mes + "-" + dia;
             }
            else{
                tarefa.date_done = null;
            }
            tarefa.is_done = tarefaAnswer;
            const updateTarefa =  await Tarefa.updateOne({_id: req.params.id}, tarefa);

            if (updateTarefa.matchedCount === 0) {
                res.status(422).json({ mensagem: "erro" });
                return 
            }

            res.status(200).json(tarefa);


        }
        catch (error) {
            res.status(500).json({ error : error})
        }
    });


    module.exports = router;