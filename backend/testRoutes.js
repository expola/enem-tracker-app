const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// Rotas para testes (todas protegidas pelo middleware de autenticação)
router.get('/', testController.getTestes);
router.get('/estatisticas', testController.getEstatisticas);
router.get('/analise-erros', testController.getAnaliseErros);
router.get('/:id', testController.getTesteById);
router.post('/', testController.createTeste);
router.put('/:id', testController.updateTeste);
router.delete('/:id', testController.deleteTeste);

module.exports = router;
