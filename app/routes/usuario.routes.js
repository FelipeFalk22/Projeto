const express = require('express');
var router = express.Router();
const usuarioController = require('../controllers/UsuarioController.js');

// Rota de criação de usuário
router.post('/usuario', usuarioController.create);
/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Cria um usuário
 *     description: Registra um novo usuário no sistema de chamados de suporte e retorna um token JWT.
 *     tags: [usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoUsuario'
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 *       '500':
 *         description: Erro interno no servidor.
 */

// Rota de login
router.post('/usuario/login', usuarioController.login);
/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Login de usuário
 *     description: Autentica o usuário e retorna um token JWT para acessar as rotas protegidas.
 *     tags: [usuario]
 *     security: []  # rota pública (sem token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUsuario'
 *     responses:
 *       '200':
 *         description: Login realizado com sucesso.
 *       '400':
 *         description: Dados inválidos.
 *       '404':
 *         description: Usuário ou senha incorretos.
 *       '500':
 *         description: Erro interno no servidor.
 */

module.exports = router;
