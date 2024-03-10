const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_exstudent_exs', {
    exs_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    exs_nom: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    exs_prenom: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    exs_description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    exs_email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    exs_longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    exs_anneediplome: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exs_laltitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    exs_photo: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    cpt_login: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 't_compte_cpt',
        key: 'cpt_login'
      }
    },
    dom_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 't_domaine_dom',
        key: 'dom_id'
      }
    },
    mas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 't_master_mas',
        key: 'mas_id'
      }
    }
  }, {
    sequelize,
    tableName: 't_exstudent_exs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "exs_id" },
        ]
      },
      {
        name: "fk_cPro_cProfil1_idx",
        using: "BTREE",
        fields: [
          { name: "cpt_login" },
        ]
      },
      {
        name: "fk_cPro_cDomaine1_idx",
        using: "BTREE",
        fields: [
          { name: "dom_id" },
        ]
      },
      {
        name: "fk_cPro_Master1_idx",
        using: "BTREE",
        fields: [
          { name: "mas_id" },
        ]
      },
    ]
  });
};
