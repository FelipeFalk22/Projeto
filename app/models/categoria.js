const Sequelize = require('sequelize');
const db = require('./conexao.js');

const Categoria = db.define('categoria', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome: { 
    type: Sequelize.STRING(200), 
    allowNull: false 
  },
  descricao: { 
    type: Sequelize.STRING(255), 
    allowNull: false 
  }
}, {
  tableName: 'categoria',
  timestamps: true,  // usa created_at e updated_at automaticamente
  underscored: true 
});

module.exports = Categoria;
