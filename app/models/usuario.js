const Sequelize = require('sequelize');
const db = require('./conexao.js');

const Usuario = db.define('usuario', {
  id: { 
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nome: { 
    type: Sequelize.STRING(200), 
    allowNull: false 
  },
  email: { 
    type: Sequelize.STRING(80), 
    allowNull: false, 
    unique: true 
  },
  senha: { 
    type: Sequelize.STRING(64), 
    allowNull: false 
  },
  tipo: { 
    type: Sequelize.STRING(20), 
    allowNull: false, 
    defaultValue: 'user' 
  }
}, {
  tableName: 'usuario',
  timestamps: true,
  underscored: true
});

module.exports = Usuario;
