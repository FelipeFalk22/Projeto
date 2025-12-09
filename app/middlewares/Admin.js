module.exports = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({
      message: 'Token inválido ou não enviado.'
    });
  }

  if (req.usuario.tipo !== 'admin') {
    return res.status(403).json({
      message: 'Apenas administradores podem acessar esta funcionalidade.'
    });
  }

  next();
};
