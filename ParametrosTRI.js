const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Questao = require('./Questao');

const ParametrosTRI = sequelize.define('ParametrosTRI', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  questao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Questao,
      key: 'id'
    }
  },
  parametro_a: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  parametro_b: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  parametro_c: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  dificuldade: {
    type: DataTypes.ENUM('Fácil', 'Médio', 'Difícil'),
    allowNull: true
  }
}, {
  tableName: 'parametros_tri',
  timestamps: false,
  hooks: {
    beforeCreate: (parametro) => {
      if (parametro.parametro_b !== null) {
        if (parametro.parametro_b < -1) parametro.dificuldade = 'Fácil';
        else if (parametro.parametro_b <= 1) parametro.dificuldade = 'Médio';
        else parametro.dificuldade = 'Difícil';
      }
    },
    beforeUpdate: (parametro) => {
      if (parametro.parametro_b !== null) {
        if (parametro.parametro_b < -1) parametro.dificuldade = 'Fácil';
        else if (parametro.parametro_b <= 1) parametro.dificuldade = 'Médio';
        else parametro.dificuldade = 'Difícil';
      }
    }
  }
});

// Definir relacionamento com Questao
ParametrosTRI.belongsTo(Questao, { foreignKey: 'questao_id', as: 'questao' });
Questao.hasOne(ParametrosTRI, { foreignKey: 'questao_id', as: 'parametros_tri' });

module.exports = ParametrosTRI;
