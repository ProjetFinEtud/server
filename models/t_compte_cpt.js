const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_compte_cpt', {
    cpt_login: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    cpt_mdp: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    cpt_type: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cpt_creation: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cpt_update: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cpt_etat: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 't_compte_cpt',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cpt_login" },
        ]
      },
    ]
  });
};
