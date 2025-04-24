const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registrar novo usuário
exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se o usuário já existe
    const usuarioExistente = await User.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Este e-mail já está em uso' });
    }

    // Criar novo usuário
    const novoUsuario = await User.create({
      nome,
      email,
      hash_senha: senha,
      data_criacao: new Date()
    });

    // Gerar token JWT
    const token = jwt.sign(
      { id: novoUsuario.id, email: novoUsuario.email },
      process.env.JWT_SECRET || 'secret_temporario',
      { expiresIn: '24h' }
    );

    // Retornar dados do usuário (sem a senha) e token
    return res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
      },
      token
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário pelo e-mail
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }

    // Verificar senha
    const senhaValida = await usuario.verificarSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET || 'secret_temporario',
      { expiresIn: '24h' }
    );

    // Retornar dados do usuário (sem a senha) e token
    return res.status(200).json({
      message: 'Login realizado com sucesso',
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },
      token
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

// Obter perfil do usuário
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Buscar usuário pelo ID
    const usuario = await User.findByPk(userId, {
      attributes: { exclude: ['hash_senha'] } // Excluir a senha dos dados retornados
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error('Erro ao obter perfil do usuário:', error);
    return res.status(500).json({ message: 'Erro ao obter perfil do usuário' });
  }
};
