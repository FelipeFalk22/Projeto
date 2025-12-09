module.exports = (models) => {
  const UsuarioModel = models.usuario;
  const CategoriaModel = models.categoria;
  const ChamadoModel = models.chamado;

  // -------------------------------
  // Categoria 1 -> N Chamados
  // -------------------------------
  CategoriaModel.hasMany(ChamadoModel, {
    foreignKey: 'id_categoria',
    as: 'chamados',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  ChamadoModel.belongsTo(CategoriaModel, {
    foreignKey: 'id_categoria',
    as: 'categoria'
  });

  // -------------------------------
  // Usuario 1 -> N Chamados
  // -------------------------------
  UsuarioModel.hasMany(ChamadoModel, {
    foreignKey: 'id_usuario',
    as: 'chamados_usuario',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  ChamadoModel.belongsTo(UsuarioModel, {
    foreignKey: 'id_usuario',
    as: 'usuario'
  });
};
