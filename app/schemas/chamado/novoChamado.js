module.exports = {
  type: 'object',
  properties: {
    descricao: { type: 'string', minLength: 3 },
    status: {
      type: 'string',
      enum: ['aberto', 'em andamento', 'fechado']
    }
  },
  required: ['descricao'],  // protocolo e id_usuario NÃO são enviados pelo cliente
  additionalProperties: false
};
