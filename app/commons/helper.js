const config = require('../../config.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Hash SHA-256 simples (mantém compatibilidade)
exports.hashSenha = (senha) => {
  const hash = crypto.createHash('sha256');
  hash.update(senha);
  return hash.digest('hex');
};

// Gerar token JWT
exports.gerarTokenAcesso = (nome, id, tipo) => {
  return jwt.sign(
    { nome, id, tipo },
    config.jwt.secret,
    { expiresIn: config.jwt.expiration }
  );
};
