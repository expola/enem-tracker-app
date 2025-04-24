const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./User');

const Teste = sequelize.define('Teste', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  data_teste: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  tipo_teste: {
    type: DataTypes.ENUM('Tempo', 'Coerência', 'Simulado 1', 'Simulado 2'),
    allowNull: false
  },
  tempo_gasto_min: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  nota_redacao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 1000
    }
  }
}, {
  tableName: 'testes',
  timestamps: false
});

// Definir relacionamento com User
Teste.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });
User.hasMany(Teste, { foreignKey: 'usuario_id', as: 'testes' });

module.exports = Teste;
