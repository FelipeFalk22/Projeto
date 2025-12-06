module.exports = {
  type: 'object',
  properties: {
    nome: { type: 'string', minLength: 3 },
    descricao: { type: 'string', minLength: 3 }
  },
  required: ['nome', 'descricao'],
  additionalProperties: false
};
