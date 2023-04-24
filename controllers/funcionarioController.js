const express = require('express');
const router = express.Router();

const Funcionario = require('../models/Funcionario');

router.post('/', async (req, res) => {

    const { nome, email, password, idFuncionario} = req.body;

    const funcionario = { 
        nome, email, password, idFuncionario
    }
    try { 
        await Funcionario.create(funcionario);
        res.status(201).json(funcionario);
    }
    catch (error) {
        res.status(500).json({error: error});
    }
});
    router.get('/', async (req, res) => {
        try{
            const funcionario = await Funcionario.find();
            res.status(200).json(funcionario);
         }
        catch (error){
             res.status(500).json({error: error});
        }
     });

   

    router.get('/:idFuncionario', async (req, res) => {
        try {
            const funcionario = await Funcionario.findOne({ _id: req.params.id });
            if (!funcionaio) {
                res.status(422).json({ mensagem: "Funcionário não encontrado" });
                return
            }
            res.status(200).json(funcionario);
        }
         catch (error) {
            res.status(500).json({ error: error });
        }
    });

    module.exports = router;