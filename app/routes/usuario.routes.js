const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/UsuarioController.js');
const tokenValido = require('../middlewares/TokenValido.js'); // middleware JWT

// ===============================
// LISTAR USUÁRIOS (admin)
// ===============================
router.get('/', tokenValido.check, (req, res) => usuarioController.listar(req, res));
/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Lista usuários (apenas admin)
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */

// ===============================
// CRIAR USUÁRIO
// ===============================
router.post('/', (req, res) => usuarioController.create(req, res));
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
// ATUALIZAR USUÁRIO (admin)
// ===============================
router.put('/:id', tokenValido.check, (req, res) => usuarioController.atualizar(req, res));
/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Atualiza usuário pelo ID (apenas admin)
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NovoUsuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Usuário não encontrado
 */

// ===============================
// DELETAR USUÁRIO (admin)
// ===============================
router.delete('/:id', tokenValido.check, (req, res) => usuarioController.deletar(req, res));
/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Exclui usuário pelo ID (apenas admin)
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Usuário não encontrado
 */

// ===============================
// LOGIN
// ===============================
router.post('/login', (req, res) => usuarioController.login(req, res));
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
