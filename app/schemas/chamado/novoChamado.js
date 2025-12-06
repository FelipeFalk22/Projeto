module.exports = {
  type: 'object',
  properties: {
    titulo: { type: 'string', minLength: 3 },
    descricao: { type: 'string', minLength: 3 },
    status: {
      type: 'string',
      enum: ['aberto', 'em andamento', 'fechado']
    }
  },
  required: ['titulo', 'descricao', 'status'],
  additionalProperties: false
};
