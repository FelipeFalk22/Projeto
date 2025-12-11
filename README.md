# 🎫 Sistema de Chamados -- API RESTful (Node.js + Express + Sequelize)

API RESTful desenvolvida para gerenciamento completo de **usuários**,
**chamados** e **categorias**, usando tecnologias modernas do
ecossistema Node.js.\
O projeto inclui autenticação com JWT, validação com Ajv, modelagem
relacional no MySQL e documentação com Swagger.

Este projeto foi desenvolvido na disciplina de **Desenvolvimento
Back-End**, mas pode ser utilizado como modelo profissional para
aplicações reais.

------------------------------------------------------------------------

## 📌 Funcionalidades Principais

✔ Cadastro e login de usuários (hash com bcrypt)\
✔ Abertura, edição e encerramento de chamados\
✔ Classificação dos chamados por categorias\
✔ Controle de acesso por token JWT\
✔ Rotas protegidas\
✔ Validação de dados com Ajv\
✔ Banco relacional usando Sequelize (ORM)\
✔ Documentação automática via Swagger\
✔ Estrutura escalável para evolução do projeto

------------------------------------------------------------------------

# 🚀 Tecnologias Utilizadas

-   **Node.js**
-   **Express**
-   **Sequelize (MySQL)**
-   **MySQL**
-   **bcrypt**
-   **JWT**
-   **Ajv**
-   **Cors**
-   **Swagger UI Express**

------------------------------------------------------------------------

# 🗂️ Estrutura do Projeto

    /app
      /commons
      /controllers
      /middlewares
      /models
      /routes
    /modelagem
    app.js
    config.js
    package.json

------------------------------------------------------------------------

# 🗄️ Modelagem do Banco de Dados

## 🔹 1. `usuario`

  Campo   Tipo                                    Descrição
  ------- --------------------------------------- ----------------
  id      INT PK AI                               Identificador
  nome    VARCHAR                                 Nome completo
  email   VARCHAR UNIQUE                          Usado no login
  senha   VARCHAR                                 Hash da senha
  tipo    ENUM('cliente', 'atendente', 'admin')   Permissões

------------------------------------------------------------------------

## 🔹 2. `categoria`

  Campo       Tipo        Descrição
  ----------- ----------- --------------------
  id          INT PK AI   Identificador
  nome        VARCHAR     Nome da categoria
  descricao   TEXT        Descrição opcional

------------------------------------------------------------------------

## 🔹 3. `chamado`

  Campo          Tipo                                      Descrição
  -------------- ----------------------------------------- ----------------------
  id             INT PK AI                                 Identificador
  titulo         VARCHAR                                   Título do chamado
  descricao      TEXT                                      Detalhes do problema
  status         ENUM('aberto','em_andamento','fechado')   Estado atual
  prioridade     ENUM('baixa','media','alta')              Urgência
  usuario_id     INT FK → usuario.id                       Quem abriu
  categoria_id   INT FK → categoria.id                     Classificação
  criado_em      DATETIME                                  Timestamp

------------------------------------------------------------------------

# 📘 Exemplo de Chamado

``` json
{
  "titulo": "Erro ao acessar a conta",
  "descricao": "Tento fazer login no sistema e aparece a mensagem de erro, mesmo com os dados corretos.",
  "status": "aberto",
  "prioridade": "alta",
  "usuario_id": 3,
  "categoria_id": 1
}
```

------------------------------------------------------------------------

# 🔐 Autenticação com JWT

Fluxo:

1.  Cadastro\
2.  Login\
3.  JWT\
4.  Rotas protegidas

Exemplo:

    Authorization: Bearer seu_token_aqui

------------------------------------------------------------------------

# 📚 Rotas da API

## 👤 Usuários

-   POST /usuarios\
-   POST /usuarios/login\
-   GET /usuarios

## 🏷️ Categorias

-   GET /categorias\
-   POST /categorias\
-   PUT /categorias/:id\
-   DELETE /categorias/:id

## 🎫 Chamados

-   GET /chamados\
-   GET /chamados/:id\
-   POST /chamados\
-   PUT /chamados/:id\
-   DELETE /chamados/:id

------------------------------------------------------------------------

# 📑 Validação com Ajv

✔ Tipos corretos\
✔ Campos obrigatórios\
✔ Enums\
✔ Sem campos extras

------------------------------------------------------------------------

# 📘 Documentação (Swagger)

    http://localhost:3000/docs

------------------------------------------------------------------------

# ▶️ Instalação e Execução

    npm install
    npm run dev

API em:

    http://localhost:3000


Desenvolvido por: Felipe Barcelos Rafaeli Falk
