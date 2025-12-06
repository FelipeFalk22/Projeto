const express = require('express');
var router = express.Router();

const categoriaController = require('../controllers/CategoriaController.js');
const authMiddleware = require('../middlewares/TokenValido.js');

// ===============================
// CATEGORIAS
// ===============================

// Lista todas as categorias
router.get('/', [authMiddleware.check], categoriaController.findAll);
/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     description: Retorna todas as categorias de chamados.
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 */

// Recupera uma categoria pelo ID
router.get('/:id', [authMiddleware.check], categoriaController.find);
/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Recupera uma categoria pelo ID
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 */

// Cria nova categoria
router.post('/', [authMiddleware.check], categoriaController.create);
/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma nova categoria de chamado
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 */

// Atualiza categoria
router.put('/:id', [authMiddleware.check], categoriaController.update);
/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 */

// Exclui categoria
router.delete('/:id', [authMiddleware.check], categoriaController.delete);
/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Exclui uma categoria
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 */

module.exports = router;
