const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/CategoriaController.js');
const authMiddleware = require('../middlewares/TokenValido.js');
const admin = require('../middlewares/Admin.js');

// ===============================
// ROTAS DE CATEGORIAS
// ===============================

// LISTAR TODAS
router.get(
  '/',
  authMiddleware.check,
  categoriaController.findAll
);
/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 */

// BUSCAR POR ID
router.get(
  '/:id',
  authMiddleware.check,
  categoriaController.find
);
/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Recupera uma categoria pelo ID
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 */

// CRIAR (ADMIN)
router.post(
  '/',
  [authMiddleware.check, admin],
  categoriaController.create
);
/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma nova categoria (ADMIN)
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 */

// ATUALIZAR (ADMIN)
router.put(
  '/:id',
  [authMiddleware.check, admin],
  categoriaController.update
);
/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria (ADMIN)
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 */

// EXCLUIR (ADMIN)
router.delete(
  '/:id',
  [authMiddleware.check, admin],
  categoriaController.delete
);
/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Exclui uma categoria (ADMIN)
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 */

module.exports = router;
