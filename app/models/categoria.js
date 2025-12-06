const Sequelize = require('sequelize');
const db = require('./conexao.js');

class Categoria {
  #nome;
  #descricao;

  constructor() {}

  get nome() {
    return this.#nome;
  }
  set nome(nome) {
    this.#nome = nome;
  }

  get descricao() {
    return this.#descricao;
  }
  set descricao(desc) {
    this.#descricao = desc;
  }

  // Buscar categoria pelo ID
  static async findByPk(id) {
    try {
      const resultado = await CategoriaModel.findByPk(id);
      if (resultado) {
        return resultado;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Listar todas as categorias (podendo incluir chamados)
  static async findAll(chamado) {
    try {
      const resultados = await CategoriaModel.findAll({ include: chamado });
      if (resultados) {
        return resultados;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Criar nova categoria
  static async create(novaCategoria) {
    try {
      const categoria = await CategoriaModel.create({
        nome: novaCategoria.nome,
        descricao: novaCategoria.descricao,
      });
      return categoria;
    } catch (error) {
      throw error;
    }
  }

  // Atualizar categoria
  static async update(dados, idCategoria) {
    try {
      const resultado = await CategoriaModel.update(dados, { where: { id: idCategoria } });

      if (resultado) {
        return resultado;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  // Excluir categoria
  static async delete(id) {
    try {
      const data = await CategoriaModel.findByPk(id);
      if (data) {
        await data.destroy();
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
const CategoriaModel = db.define('categoria', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

module.exports = { Categoria, CategoriaModel };
