const jwt = require('jsonwebtoken');
const config = require('../../config.js');

class TokenValido {
  async check(request, response, next) {
    const cabecalhoAuth = request.headers['authorization'];

    // Se não enviou o header Authorization
    if (!cabecalhoAuth) {
      return response.status(401).json({
        message: 'Sem autorização: o cabeçalho Authorization não foi fornecido.',
      });
    }

    // Formato inválido (precisa ser Bearer token)
    if (!cabecalhoAuth.startsWith('Bearer')) {
      return response.status(401).json({
        message: 'Formato inválido. Utilize: Bearer [token].',
      });
    }

    const token = cabecalhoAuth.split(' ')[1];

    // Token vazio
    if (!token) {
      return response.status(401).json({
        message: 'Token não fornecido.',
      });
    }

    // Validação JWT
    jwt.verify(token, config.jwt.secret, (erro, usuarioData) => {
      if (erro) {
        return response.status(403).json({
          message: 'Token inválido ou expirado. Faça login novamente.',
        });
      }

      // Token ok → segue para a rota
      request.usuario = usuarioData;
      next();
    });
  }
}

module.exports = new TokenValido();
