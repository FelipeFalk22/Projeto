require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const port = process.env.PORT || 3000;

async function start() {
  try {
    // Testa conexão com o banco
    await sequelize.authenticate();

    // Sincroniza modelos (tabelas)
    await sequelize.sync();

    app.listen(port, () =>
      console.log(`Servidor rodando na porta ${port}`)
    );

  } catch (err) {
    console.error('Erro ao iniciar aplicação:', err);
    process.exit(1);
  }
}

start();
