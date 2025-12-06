const conexao = require('./conexao.js');
const categoria = require('./Categoria.js');
const chamado = require('./Chamado.js');
const usuario = require('./Usuario.js');
const relations = require('./relations.js');

const db = {};

// Importa e guarda os models
db.categoria = categoria;
db.chamado = chamado;
db.usuario = usuario;

// Passa os Models Sequelize reais para relations.js
relations({
  CategoriaModel: categoria.CategoriaModel,
  ChamadoModel: chamado.ChamadoModel,
  UsuarioModel: usuario.UsuarioModel,
});

// Sincroniza banco
conexao
  .sync({})
  .then(() => {
    console.log('Sincronização com o banco de dados realizada com sucesso...');
  })
  .catch((err) => {
    console.log('Falha ao sincronizar com o banco de dados: ' + err.message);
  });

module.exports = db;
