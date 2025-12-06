require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');

const app = express();

// --- PRE-CONFIGURAÇÃO ---
app.use(express.json());
app.use(cors({ origin: '*' }));

// --- BANCO DE DADOS ---
const conexao = require('./app/models'); // Importa configuração do Sequelize

// --- DOCUMENTAÇÃO ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- ROTAS ---
app.get('/', (req, res) => {
  res.json({
    message: 'API - Sistema de Chamados de Suporte',
    version: '1.0',
  });
});

// Rotas do novo tema
const categoriaRotas = require('./app/routes/categoria.routes.js');
const chamadoRotas = require('./app/routes/chamado.routes.js');
const usuarioRotas = require('./app/routes/usuario.routes.js');

app.use('/categorias', categoriaRotas);
app.use('/chamados', chamadoRotas);
app.use('/', usuarioRotas);

// --- SERVIDOR ---
app.listen(config.port, () => {
  console.log(`Servidor online na porta ${config.port}`);
  console.log(`Documentação Swagger: http://localhost:${config.port}/api-docs`);
});
