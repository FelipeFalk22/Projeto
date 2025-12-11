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

  if (!/^bearer\s+/i.test(cabecalhoAuth)) {
      return response.status(401).json({
        message: 'Formato inválido. Utilize: Bearer [token].',
      });
    }
// Token aceita múltiplos espaços
    const token = cabecalhoAuth.split(/\s+/)[1];

    // Token vazio
    if (!token) {
      return response.status(401).json({
        message: 'Token não fornecido.',
      });
    }

    // Verificar token
    jwt.verify(token, config.jwt.secret, (erro, usuarioData) => {
      if (erro) {
        return response.status(403).json({
          message: 'Token inválido ou expirado. Faça login novamente.',
        });
      }

      // Token válido → salvar dados do usuário e seguir
      request.usuario = usuarioData; // usado pelos controllers (tipo, id, nome)
      next();
    });
  }
}

module.exports = new TokenValido();
