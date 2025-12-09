const models = require('../models');
const Categoria = models.categoria;

class CategoriaController {

  // CRIAR
  async create(req, res) {
    const dados = {
      nome: req.body.nome,
      descricao: req.body.descricao
    };

    try {
      const categoria = await Categoria.create(dados);
      return res.status(201).json(categoria);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // LISTAR TODAS
  async findAll(req, res) {
    try {
      const categorias = await Categoria.findAll({
        include: {                 // 🔥 funcionando com sua relation
          model: models.chamado,
          as: 'chamados'
        }
      });
      return res.status(200).json(categorias);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // BUSCAR POR ID
  async find(req, res) {
    const id = req.params.id;
    try {
      const categoria = await Categoria.findByPk(id, {
        include: {
          model: models.chamado,
          as: 'chamados'
        }
      });

      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada.' });
      }

      return res.status(200).json(categoria);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // ATUALIZAR
  async update(req, res) {
    const id = req.params.id;
    const dados = req.body;

    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada.' });
      }

      await categoria.update(dados);
      return res.status(200).json(categoria);

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // EXCLUIR
  async delete(req, res) {
    const id = req.params.id;

    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ message: 'Categoria não encontrada.' });
      }

      await categoria.destroy(); // 🔥 CASCADE funciona por causa da relação
      return res.status(200).json({ message: 'Categoria removida.' });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new CategoriaController();
