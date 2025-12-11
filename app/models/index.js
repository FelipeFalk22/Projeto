const conexao = require('./conexao.js');

// Cada arquivo retorna diretamente o Model Sequelize
const Usuario = require('./Usuario.js');
const Categoria = require('./Categoria.js');
const Chamado = require('./Chamado.js');

// Importa função de relações
const relations = require('./relations.js');

const db = {};

// Registra os models dentro do objeto db
db.usuario = Usuario;
db.categoria = Categoria;
db.chamado = Chamado;

// Passa os models para aplicar relacionamentos
relations({
  usuario: Usuario,
  categoria: Categoria,
  chamado: Chamado
});

module.exports = db;
