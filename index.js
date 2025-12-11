require('dotenv').config();
const app = require('./app');

// Conexão verdadeira do Sequelize
const conexao = require('./app/models/conexao.js');

const port = process.env.PORT || 3000;

async function start() {
  try {
    // Testa a conexão
    await conexao.authenticate();
    console.log('Conectado ao banco de dados');

    // Sincroniza as tabelas
    await conexao.sync();

    // Inicia o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });

  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

start();
