const models = require('../models');
const { ChamadoModel: Chamado } = require('../models/Chamado.js');

const Ajv = require('ajv');
const ajv = new Ajv();

const schema = require('../schemas/chamado/novoChamado.js');
const validacao = ajv.compile(schema);

class ChamadoController {
  
  // Listar chamados de uma categoria
  findByCategoria(request, response) {
    const id_categoria = request.params.id_categoria;

    Chamado.findAll({ where: { id_categoria } })
      .then((chamados) => {
        if (chamados && chamados.length > 0) {
          return response.status(200).json(chamados);
        }
        return response.status(404).json({
          message: 'Nenhum chamado encontrado para esta categoria',
        });
      })
      .catch((error) => {
        return response.status(500).json({ message: error.message });
      });
  }

  // Criar chamado vinculado a uma categoria
  create(request, response) {
    let validacoes = validacao(request.body);

    if (!validacoes) {
      let mensagem = validacao.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacao.errors[0].message;
      return response.status(400).json({ message: mensagem });
    }

    const chamadoParaCriar = {
      ...request.body,
      id_categoria: request.params.id_categoria,
      id_usuario: request.body.id_usuario, // usuário que abriu
    };

    Chamado.create(chamadoParaCriar)
      .then((novoChamado) => response.status(201).json(novoChamado))
      .catch((erro) =>
        response.status(500).json({
          message: 'erro no servidor: ' + erro.message,
        })
      );
  }

  // Atualizar chamado
  update(request, response) {
    const { id_categoria, id_chamado } = request.params;

    Chamado.update(request.body, { where: { id: id_chamado, id_categoria } })
      .then((resultado) => {
        if (resultado[0] > 0) {
          Chamado.findOne({
            where: { id: id_chamado, id_categoria },
          }).then((data) => {
            response.status(200).json(data);
          });
        } else {
          response.status(404).json({
            message: `Chamado com id=${id_chamado} não encontrado ou sem alterações.`,
          });
        }
      })
      .catch((err) =>
        response.status(500).json({
          message: 'Erro ao atualizar o chamado: ' + err.message,
        })
      );
  }

  // Excluir chamado
  delete(request, response) {
    const { id_chamado, id_categoria } = request.params;

    Chamado.destroy({ where: { id: id_chamado, id_categoria } })
      .then((removido) => {
        if (removido) {
          return response.status(200).json({
            message: 'Chamado excluído com sucesso',
          });
        } else {
          return response.status(404).json({
            message: 'Chamado não encontrado',
          });
        }
      })
      .catch((erro) => {
        response.status(500).json({ message: erro.message });
      });
  }
}

module.exports = new ChamadoController();
