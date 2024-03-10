const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_accueil_acc', {
    acc_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    acc_titre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    acc_texte: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    adm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 't_admin_adm',
        key: 'adm_id'
      }
    }
  }, {
    sequelize,
    tableName: 't_accueil_acc',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "acc_id" },
        ]
      },
      {
        name: "fk_t_accueil_acc_t_admin_adm1_idx",
        using: "BTREE",
        fields: [
          { name: "adm_id" },
        ]
      },
    ]
  });
};
