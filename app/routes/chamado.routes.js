const express = require('express');
const router = express.Router();

const chamadoController = require('../controllers/ChamadoController.js');
const authMiddleware = require('../middlewares/TokenValido.js');

// ===============================
// LISTAR TODOS OS CHAMADOS
// ===============================
router.get(
  '/',
  authMiddleware.check,
  chamadoController.findAll
);
/**
 * @swagger
 * /chamados:
 *   get:
 *     summary: Lista todos os chamados
 *     tags: [Chamado]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 */

// ===============================
// LISTAR CHAMADOS POR CATEGORIA
// ===============================
router.get(
  '/:id_categoria/chamados',
  authMiddleware.check,
  chamadoController.findByCategoria
);
/**
 * @swagger
 * /{id_categoria}/chamados:
 *   get:
 *     summary: Lista chamados de uma categoria
 *     tags: [Chamado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Lista de chamados
 *       404:
 *         description: Nenhum chamado encontrado
 */

// ===============================
// CRIAR CHAMADO NA CATEGORIA
// ===============================
router.post(
  '/:id_categoria/chamados',
  authMiddleware.check,
  chamadoController.create
);
/**
 * @swagger
 * /{id_categoria}/chamados:
 *   post:
 *     summary: Cria um chamado em uma categoria
 *     tags: [Chamado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoChamado'
 *     responses:
 *       201:
 *         description: Chamado criado com sucesso
 */

// ===============================
// DETALHES DE UM CHAMADO
// ===============================
router.get(
  '/:id_categoria/chamados/:id_chamado',
  authMiddleware.check,
  chamadoController.findOne
);
/**
 * @swagger
 * /{id_categoria}/chamados/{id_chamado}:
 *   get:
 *     summary: Obtém detalhes de um chamado
 *     tags: [Chamado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_chamado
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do chamado retornados
 *       404:
 *         description: Chamado não encontrado
 */

// ===============================
// ATUALIZAR CHAMADO
// ===============================
router.put(
  '/:id_categoria/chamados/:id_chamado',
  authMiddleware.check,
  chamadoController.update
);
/**
 * @swagger
 * /{id_categoria}/chamados/{id_chamado}:
 *   put:
 *     summary: Atualiza um chamado
 *     tags: [Chamado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *       - in: path
 *         name: id_chamado
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chamado'
 *     responses:
 *       200:
 *         description: Chamado atualizado com sucesso
 *       404:
 *         description: Chamado não encontrado
 */

// ===============================
// EXCLUIR CHAMADO
// ===============================
router.delete(
  '/:id_categoria/chamados/:id_chamado',
  authMiddleware.check,
  chamadoController.delete
);
/**
 * @swagger
 * /{id_categoria}/chamados/{id_chamado}:
 *   delete:
 *     summary: Remove um chamado
 *     tags: [Chamado]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *       - in: path
 *         name: id_chamado
 *     responses:
 *       200:
 *         description: Chamado removido com sucesso
 *       404:
 *         description: Chamado não encontrado
 */

module.exports = router;
