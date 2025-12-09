module.exports = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    senha: { type: 'string', minLength: 1 }
  },
  required: ['email', 'senha'],
  additionalProperties: false
};
