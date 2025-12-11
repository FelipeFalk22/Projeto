module.exports = {
  port: process.env.PORT || 3000,

  jwt: {
    secret: process.env.SECRET,
    expiration: 3600, // 1 hora em segundos
  },

  dbconfig: {
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    dialect: process.env.DBDIALECT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      underscored: true,       // createdAt → created_at
      freezeTableName: true,   // evita plural automático
      timestamps: true,        // cria created_at e updated_at
      paranoid: false,
    },
  },
};
