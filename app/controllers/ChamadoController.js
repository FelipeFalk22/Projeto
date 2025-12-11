const models = require('../models');
const Chamado = models.chamado; 

class ChamadoController {

  // Listar todos os chamados
  findAll(req, res) {
    Chamado.findAll()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({ message: err.message }));
  }

  // Buscar um chamado pelo ID
  async findOne(req, res) {
    const { id_chamado } = req.params;

    try {
      const chamado = await Chamado.findOne({ where: { id: id_chamado } });

      if (!chamado) {
        return res.status(404).json({ message: 'Chamado não encontrado.' });
      }

      return res.status(200).json(chamado);

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // Listar chamados de uma categoria
  async findByCategoria(req, res) {
    const { id_categoria } = req.params;
    try {
      const chamados = await Chamado.findAll({ where: { id_categoria } });
      if (!chamados || chamados.length === 0) {
        return res.status(404).json({ message: 'Nenhum chamado encontrado.' });
      }
      return res.status(200).json(chamados);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // Criar chamado dentro da categoria
  async create(req, res) {
    const { id_categoria } = req.params;
    const dados = req.body;

    try {
      // ID do usuário autenticado
      const id_usuario = req.usuario.id;

      // Gera protocolo automáticamente
      const protocolo = 'CHAM-' + Date.now();

      const chamado = await Chamado.create({
        ...dados,
        id_categoria,
        id_usuario,
        protocolo
      });

      return res.status(201).json(chamado);

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // Atualizar chamado
  async update(req, res) {
    const { id_categoria, id_chamado } = req.params;
    const dados = req.body;

    try {
      const chamado = await Chamado.findOne({ where: { id: id_chamado, id_categoria } });
      if (!chamado)
        return res.status(404).json({ message: 'Chamado não encontrado.' });

      await chamado.update(dados);
      return res.status(200).json(chamado);

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // Excluir chamado
  async delete(req, res) {
    const { id_categoria, id_chamado } = req.params;

    try {
      const chamado = await Chamado.findOne({ where: { id: id_chamado, id_categoria } });
      if (!chamado)
        return res.status(404).json({ message: 'Chamado não encontrado.' });

      await chamado.destroy();
      return res.status(200).json({ message: 'Chamado removido com sucesso.' });

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new ChamadoController();
