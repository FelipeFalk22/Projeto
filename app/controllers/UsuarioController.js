const models = require('../models/index.js');
const Usuario = models.usuario;

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = require('../schemas/usuario/novoUsuario.js');
const validacao = ajv.compile(schema);

const helper = require('../commons/helper.js');

const schemaLogin = require('../schemas/usuario/login.js');
const validacaoLogin = ajv.compile(schemaLogin);

class UsuarioController {

  // Criar usuário
  create(req, res) {
    const valido = validacao(req.body);

    if (!valido) {
      const erro = validacao.errors[0];
      const campo = erro.instancePath.replace('/', '') || 'campo';
      const mensagem = `${campo} ${erro.message}`;
      return res.status(400).json({ message: mensagem });
    }

    const usuario = {
      nome: req.body.nome,
      email: req.body.email,
      senha: helper.hashSenha(req.body.senha),
      tipo: req.body.tipo || 'user'
    };

    Usuario.create(usuario)
      .then((data) => {
        // remove senha do retorno
        data.setDataValue('senha', '');

        // gera token
        const token = helper.gerarTokenAcesso(data.nome, data.id, data.tipo);
        data.setDataValue('token', token);

        return res.status(201).json(data);
      })
      .catch((erro) => {
        return res.status(500).json({ message: erro.message });
      });
  }

  // Listar usuários
  listar(req, res) {
    Usuario.findAll({
      attributes: ['id', 'nome', 'email', 'tipo'] // sem senha
    })
      .then((usuarios) => {
        return res.status(200).json(usuarios);
      })
      .catch((erro) => {
        return res.status(500).json({ message: erro.message });
      });
  }

  // Login
  login(req, res) {
    const valido = validacaoLogin(req.body);

    if (!valido) {
      const erro = validacaoLogin.errors[0];
      const campo = erro.instancePath.replace('/', '') || 'campo';
      const mensagem = `${campo} ${erro.message}`;
      return res.status(400).json({ message: mensagem });
    }

    const dados = {
      email: req.body.email,
      senha: helper.hashSenha(req.body.senha)
    };

    Usuario.findOne({
      where: { email: dados.email, senha: dados.senha }
    })
      .then((registro) => {
        if (!registro) {
          return res.status(404).json({
            message: 'Usuário ou senha não encontrados.'
          });
        }

        // gerar token
        const token = helper.gerarTokenAcesso(registro.nome, registro.id, registro.tipo);

        return res.status(200).json({ token });
      })
      .catch((erro) => {
        return res.status(500).json({ message: erro.message });
      });
  }

  
// Atualizar usuário (apenas admin)
atualizar(req, res) {
  const { id } = req.params;

  // Verifica se o usuário logado é admin
  if (req.usuario.tipo !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  const valido = validacao(req.body);
  if (!valido) {
    const erro = validacao.errors[0];
    const campo = erro.instancePath.replace('/', '') || 'campo';
    const mensagem = `${campo} ${erro.message}`;
    return res.status(400).json({ message: mensagem });
  }

  Usuario.findByPk(id)
    .then(usuario => {
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Atualiza os dados
      usuario.nome = req.body.nome;
      usuario.email = req.body.email;
      usuario.tipo = req.body.tipo;
      if (req.body.senha) {
        usuario.senha = helper.hashSenha(req.body.senha);
      }

      return usuario.save()
        .then(() => res.status(200).json({ message: 'Usuário atualizado com sucesso' }));
    })
    .catch(erro => {
      return res.status(500).json({ message: 'Erro ao atualizar usuário' });
    });
}

  // Deletar usuário (apenas admin)
  deletar(req, res) {
    const { id } = req.params;

    // Verifica se o usuário logado é admin
    if (req.user.tipo !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    Usuario.findByPk(id)
      .then(usuario => {
        if (!usuario) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return usuario.destroy()
          .then(() => res.status(200).json({ message: 'Usuário excluído com sucesso' }));
      })
      .catch(erro => {
        return res.status(500).json({ message: 'Erro ao excluir usuário' });
      });
  }

}

module.exports = new UsuarioController();
