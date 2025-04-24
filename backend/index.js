require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', userRoutes);
app.use('/api/tests', authMiddleware, testRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API funcionando corretamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
