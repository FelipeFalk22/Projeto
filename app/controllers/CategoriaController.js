// validação de schema
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = require('../schemas/categoria/novaCategoria.js');
const validacao = ajv.compile(schema);

// models
const models = require('../models');
const CategoriaModel = models.categoria.CategoriaModel;
const ChamadoModel = models.chamado.ChamadoModel;

class CategoriaController {
  
  // Listar todas as categorias
  findAll(request, response) {
    CategoriaModel.findAll({
      include: [{ model: ChamadoModel, as: 'chamados' }],
    })
      .then((data) => {
        if (data && data.length > 0) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'Nenhuma categoria encontrada',
          });
        }
      })
      .catch((erro) => {
        response.status(500).json({
          message: erro.message,
        });
      });
  }

  // Buscar categoria por ID
  find(request, response) {
    const id = request.params.id;

    CategoriaModel.findByPk(id, {
      include: [{ model: ChamadoModel, as: 'chamados' }],
    })
      .then((data) => {
        if (data) {
          return response.status(200).json(data);
        } else {
          return response.status(404).json({
            message: 'Categoria não encontrada',
          });
        }
      })
      .catch((erro) => {
        return response.status(500).json({
          message: erro.message,
        });
      });
  }

  // Criar nova categoria
  create(request, response) {
    let validacoes = validacao(request.body);

    if (!validacoes) {
      let mensagem = validacao.errors[0].instancePath.replace('/', '');
      mensagem += ' ' + validacao.errors[0].message;
      return response.status(400).json({
        message: mensagem,
      });
    }

    CategoriaModel.create(request.body)
      .then((data) => {
        return response.status(201).json(data);
      })
      .catch((erro) => {
        return response.status(500).json({
          message: 'Erro no servidor: ' + erro.message,
        });
      });
  }

  // Atualizar categoria
  update(request, response) {
    const id = request.params.id;

    CategoriaModel.findByPk(id)
      .then((buscaCategoria) => {
        if (buscaCategoria === null) {
          return response.status(404).json({
            message: 'Categoria não encontrada',
          });
        } else {
          CategoriaModel.update(request.body, { where: { id } })
            .then((resultado) => {
              if (resultado[0] > 0) {
                CategoriaModel.findByPk(id).then((categoriaAtualizada) => {
                  return response.status(200).json(categoriaAtualizada);
                });
              } else {
                return response.status(500).json({
                  message: 'Ocorreu algum problema no servidor',
                });
              }
            })
            .catch((erro) => {
              return response.status(500).json({
                message: erro.message,
              });
            });
        }
      })
      .catch((erro) => {
        return response.status(500).json({
          message: erro.message,
        });
      });
  }

  // Excluir categoria
  delete(request, response) {
    const id = request.params.id;

    CategoriaModel.destroy({ where: { id } })
      .then((removido) => {
        if (removido) {
          return response.status(200).json({
            message: 'Categoria excluída com sucesso',
          });
        } else {
          return response.status(404).json({
            message: 'Categoria não encontrada',
          });
        }
      })
      .catch((erro) => {
        response.status(500).json({
          message: erro.message,
        });
      });
  }
}

module.exports = new CategoriaController();
