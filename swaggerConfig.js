const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Suporte - Sistema de Chamados',
      version: '1.0.0',
      description: 'Documentação da API RESTful para gerenciamento de usuários, categorias e chamados.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token no formato: Bearer [seu_token]',
        },
      },
      schemas: {

        // ===============================
        // USUÁRIO
        // ===============================
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Felipe Barcelos' },
            email: { type: 'string', example: 'felipe@ifsc.edu.br' },
            tipo: { type: 'string', example: 'user' },
          },
        },

        NovoUsuario: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            nome: { type: 'string', example: 'Felipe Barcelos' },
            email: { type: 'string', example: 'felipe@ifsc.edu.br' },
            senha: { type: 'string', example: '123456' },
            tipo: { type: 'string', example: 'admin' },
          },
        },

        LoginUsuario: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: { type: 'string', example: 'felipe@ifsc.edu.br' },
            senha: { type: 'string', example: '123456' },
          },
        },

        // ===============================
        // CATEGORIA
        // ===============================
        Categoria: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Hardware' },
            descricao: { type: 'string', example: 'Problemas em equipamentos físicos' },
          },
        },

        NovaCategoria: {
          type: 'object',
          required: ['nome', 'descricao'],
          properties: {
            nome: { type: 'string', example: 'Software' },
            descricao: { type: 'string', example: 'Falhas em sistemas e programas' },
          },
        },

        // ===============================
        // CHAMADO
        // ===============================
        Chamado: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            protocolo: { type: 'string', example: 'CHAM-20250201-182038' },
            descricao: { type: 'string', example: 'Computador não liga' },
            status: { type: 'string', example: 'aberto' },
            id_categoria: { type: 'integer', example: 2 },
            id_usuario: { type: 'integer', example: 1 },
          },
        },

        // ✔ NovoChamado ARRUMADO para coincidir com seu controller
        NovoChamado: {
          type: 'object',
          required: ['descricao'],
          properties: {
            descricao: { type: 'string', example: 'Erro ao abrir sistema interno' },
            status: { type: 'string', example: 'aberto' },
          },
        },

      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ['./app/routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
