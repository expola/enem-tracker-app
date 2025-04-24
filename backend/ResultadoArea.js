const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Teste = require('./Teste');

const ResultadoArea = sequelize.define('ResultadoArea', {
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
  area: {
    type: DataTypes.ENUM('Linguagens', 'Humanas', 'Natureza', 'Matemática'),
    allowNull: false
  },
  total_questoes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  acertos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {
  tableName: 'resultados_areas',
  timestamps: false
});

// Definir relacionamento com Teste
ResultadoArea.belongsTo(Teste, { foreignKey: 'teste_id', as: 'teste' });
Teste.hasMany(ResultadoArea, { foreignKey: 'teste_id', as: 'resultados' });

module.exports = ResultadoArea;
