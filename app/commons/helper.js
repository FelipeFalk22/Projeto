const config = require('../../config.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// ⚠️ SOMENTE PARA TESTES NO POSTMAN (remover depois)
console.log('🔐 Chave JWT carregada no middleware:', config.jwt.secret);

exports.hashSenha = (senha) => {
  const hash = crypto.createHash('sha256');
  hash.update(senha);
  return hash.digest('hex');
};

exports.gerarTokenAcesso = (nome, id) => {
  return jwt.sign(
    { nome, id },
    config.jwt.secret,
    { expiresIn: config.jwt.expiration }
  );
};
