const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/UsuarioController.js');

// ===============================
// LISTAR USUÁRIOS (APENAS TESTE)
// ===============================
router.get('/usuario', usuarioController.listar);
/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Lista usuários (apenas para teste)
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */

// ===============================
// CRIAR USUÁRIO
// ===============================
router.post('/usuario', usuarioController.create);
/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoUsuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */

// ===============================
// LOGIN
// ===============================
router.post('/usuario/login', usuarioController.login);
/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUsuario'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       404:
 *         description: Usuário ou senha incorretos
 */

module.exports = router;
