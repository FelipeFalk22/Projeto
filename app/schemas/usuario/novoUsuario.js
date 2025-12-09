module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', minLength: 4 },
    email: { type: 'string', format: 'email' },
    senha: { type: 'string', minLength: 6 },
    tipo: { type: 'string', enum: ['admin', 'user'] }
  },
  required: ['nome', 'email', 'senha'],
  additionalProperties: false
};
