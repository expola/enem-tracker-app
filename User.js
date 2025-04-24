const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  hash_senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_criacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.hash_senha) {
        const salt = await bcrypt.genSalt(10);
        user.hash_senha = await bcrypt.hash(user.hash_senha, salt);
      }
    }
  }
});

// Método para verificar senha
User.prototype.verificarSenha = async function(senha) {
  return await bcrypt.compare(senha, this.hash_senha);
};

module.exports = User;
