module.exports = (models) => {
  const { CategoriaModel, ChamadoModel, UsuarioModel } = models;

  if (!CategoriaModel || !ChamadoModel || !UsuarioModel) {
    console.warn('⚠️ Models não carregados corretamente em relations.js');
    return;
  }

  // --- RELACIONAMENTO: Categoria 1 -> N Chamados ---
  if (!CategoriaModel.associations.chamados) {
    CategoriaModel.hasMany(ChamadoModel, {
      foreignKey: 'id_categoria',
      as: 'chamados',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }

  if (!ChamadoModel.associations.categoria) {
    ChamadoModel.belongsTo(CategoriaModel, {
      foreignKey: 'id_categoria',
      as: 'categoria',
    });
  }

  // --- RELACIONAMENTO: Usuário 1 -> N Chamados ---
  if (!UsuarioModel.associations.chamados) {
    UsuarioModel.hasMany(ChamadoModel, {
      foreignKey: 'id_usuario',
      as: 'chamados',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }

  if (!ChamadoModel.associations.usuario) {
    ChamadoModel.belongsTo(UsuarioModel, {
      foreignKey: 'id_usuario',
      as: 'usuario',
    });
  }
};
