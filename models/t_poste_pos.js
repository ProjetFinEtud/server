const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_poste_pos', {
    pos_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pos_description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    pos_entreprise: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    pos_debut: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pos_fin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exs_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 't_exstudent_exs',
        key: 'exs_id'
      }
    },
    pre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 't_preposte_pre',
        key: 'pre_id'
      }
    }
  }, {
    sequelize,
    tableName: 't_poste_pos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pos_id" },
        ]
      },
      {
        name: "fk_t_poste_pos_t_exstudent_exs1_idx",
        using: "BTREE",
        fields: [
          { name: "exs_id" },
        ]
      },
      {
        name: "fk_t_poste_pos_t_preposte_pre1_idx",
        using: "BTREE",
        fields: [
          { name: "pre_id" },
        ]
      },
    ]
  });
};
