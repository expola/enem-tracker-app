const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Teste = require('./Teste');
const Questao = require('./Questao');

const Resposta = sequelize.define('Resposta', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  teste_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Teste,
      key: 'id'
    }
  },
  questao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Questao,
      key: 'id'
    }
  },
  acertou: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'respostas',
  timestamps: false
});

// Definir relacionamentos
Resposta.belongsTo(Teste, { foreignKey: 'teste_id', as: 'teste' });
Resposta.belongsTo(Questao, { foreignKey: 'questao_id', as: 'questao' });
Teste.hasMany(Resposta, { foreignKey: 'teste_id', as: 'respostas' });
Questao.hasMany(Resposta, { foreignKey: 'questao_id', as: 'respostas' });

module.exports = Resposta;
