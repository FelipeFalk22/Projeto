const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Chamado {
  #titulo;
  #descricao;
  #status;
  #prioridade;

  constructor() {}

  get titulo() {
    return this.#titulo;
  }
  set titulo(tit) {
    this.#titulo = tit;
  }

  get descricao() {
    return this.#descricao;
  }
  set descricao(desc) {
    this.#descricao = desc;
  }

  get status() {
    return this.#status;
  }
  set status(stat) {
    this.#status = stat;
  }

  get prioridade() {
    return this.#prioridade;
  }
  set prioridade(prio) {
    this.#prioridade = prio;
  }

  // Busca todos os chamados de uma categoria
  static findAllByCategoriaId(id_categoria) {
    return ChamadoModel.findAll({ where: { id_categoria } });
  }

  // Cria um novo chamado
  static create(novoChamado) {
    return ChamadoModel.create(novoChamado);
  }

  // Atualiza um chamado específico de uma categoria
  static update(dados, id_categoria, id_chamado) {
    return ChamadoModel.update(dados, {
      where: { id: id_chamado, id_categoria: id_categoria },
    });
  }

  // Busca um chamado específico
  static findOne(id_categoria, id_chamado) {
    return ChamadoModel.findOne({ where: { id: id_chamado, id_categoria: id_categoria } });
  }

  // Exclui um chamado
  static async delete(id_chamado, id_categoria) {
    try {
      const chamado = await ChamadoModel.findOne({
        where: { id: id_chamado, id_categoria: id_categoria },
      });

      if (chamado) {
        await chamado.destroy();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}

// Modelo Sequelize (estrutura da tabela)
const ChamadoModel = db.define('chamado', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  // FK para Categoria
  id_categoria: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  // FK para Usuario (quem abriu)
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  titulo: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },

  descricao: {
    type: Sequelize.TEXT,
    allowNull: true,
  },

  status: {
    type: Sequelize.STRING(50),
    allowNull: false,
    defaultValue: 'aberto',
  },

  prioridade: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'média',
  },
});

module.exports = { Chamado, ChamadoModel };
