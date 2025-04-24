const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.post('/register', userController.register);
router.post('/login', userController.login);

// Rotas protegidas
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;
