require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.json({
    message: 'API - Sistema de Chamados de Suporte',
    version: '1.0',
  });
});

// ROTAS
const categoriaRotas = require('./app/routes/categoria.routes.js');
const chamadoRotas = require('./app/routes/chamado.routes.js');
const usuarioRotas = require('./app/routes/usuario.routes.js');

// ORDEM CORRETA
app.use('/usuario', usuarioRotas);
app.use('/categorias', categoriaRotas);
app.use('/chamados', chamadoRotas); 
app.use('/', chamadoRotas);


module.exports = app;
