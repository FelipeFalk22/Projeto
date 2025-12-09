// models/chamado.js

const Sequelize = require('sequelize');
const db = require('./conexao.js');

// Modelo Sequelize
const ChamadoModel = db.define('chamado', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_categoria: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  protocolo: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  status: {
    type: Sequelize.STRING(50),
    allowNull: false,
    defaultValue: 'aberto'
  }
}, {
  tableName: 'chamado',
  timestamps: true,
  underscored: true
});

// Classe com métodos (igual ao projeto antigo)
class Chamado {
  static create(data) {
    return ChamadoModel.create(data);
  }

  static findByPk(id) {
    return ChamadoModel.findByPk(id);
  }

  static findAll(filtro) {
    return ChamadoModel.findAll(filtro);
  }

  static update(dados, id) {
    return ChamadoModel.update(dados, { where: { id } });
  }

  static async delete(id) {
    const chamado = await ChamadoModel.findByPk(id);
    if (!chamado) return false;

    await chamado.destroy();
    return true;
  }
}

module.exports = ChamadoModel;
