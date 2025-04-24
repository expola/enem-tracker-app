const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Questao = sequelize.define('Questao', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  area: {
    type: DataTypes.ENUM('Linguagens', 'Humanas', 'Natureza', 'Matemática'),
    allowNull: false
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
    type: DataTypes.VIRTUAL,
    get() {
      const b = this.getDataValue('parametro_b');
      if (b === null) return null;
      if (b < -1) return 'Fácil';
      if (b <= 1) return 'Médio';
      return 'Difícil';
    }
  }
}, {
  tableName: 'questoes',
  timestamps: false
});

module.exports = Questao;
