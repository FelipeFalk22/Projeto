const express = require('express');
var router = express.Router();

const chamadoController = require('../controllers/ChamadoController.js');
const authMiddleware = require('../middlewares/TokenValido.js');

// ===============================
// CHAMADOS VINCULADOS À CATEGORIA
// ===============================

// Lista todos os chamados de uma categoria
router.get('/:id_categoria/chamados', [authMiddleware.check], chamadoController.findByCategoria);
/**
 * @swagger
 * /categorias/{id_categoria}/chamados:
 *   get:
 *     summary: Lista chamados de uma categoria
 *     tags: [Chamado]
 *     security:
 *       - bearerAuth: []
 */

// Criar chamado dentro da categoria
router.post('/:id_categoria/chamados', [authMiddleware.check], chamadoController.create);
/**
 * @swagger
 * /categorias/{id_categoria}/chamados:
 *   post:
 *     summary: Cria um chamado dentro de uma categoria
 *     tags: [Chamado]
 *     security:
 *       - bearerAuth: []
 */

// Atualizar chamado
router.put('/:id_categoria/chamados/:id_chamado', [authMiddleware.check], chamadoController.update);
/**
 * @swagger
 * /categorias/{id_categoria}/chamados/{id_chamado}:
 *   put:
 *     summary: Atualiza um chamado
 *     tags: [Chamado]
 *     security:
 *       - bearerAuth: []
 */

// Excluir chamado
router.delete('/:id_categoria/chamados/:id_chamado', [authMiddleware.check], chamadoController.delete);
/**
 * @swagger
 * /categorias/{id_categoria}/chamados/{id_chamado}:
 *   delete:
 *     summary: Exclui um chamado
 *     tags: [Chamado]
 *     security:
 *       - bearerAuth: []
 */

module.exports = router;
