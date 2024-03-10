const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_admin_adm', {
    adm_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    adm_nom: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    adm_prenom: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    cpt_login: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 't_compte_cpt',
        key: 'cpt_login'
      }
    }
  }, {
    sequelize,
    tableName: 't_admin_adm',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "adm_id" },
        ]
      },
      {
        name: "fk_cAdmin_cProfil_idx",
        using: "BTREE",
        fields: [
          { name: "cpt_login" },
        ]
      },
    ]
  });
};
