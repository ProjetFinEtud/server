const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_contact_con', {
    con_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    con_date: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    con_etat: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    stu_login: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 't_compte_cpt',
        key: 'cpt_login'
      }
    },
    exs_login: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 't_compte_cpt',
        key: 'cpt_login'
      }
    },
    msg_id: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 't_contact_con',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "con_id" },
        ]
      },
      {
        name: "fk_t_contact_con_t_compte_cpt1_idx",
        using: "BTREE",
        fields: [
          { name: "stu_login" },
        ]
      },
      {
        name: "fk_t_contact_con_t_compte_cpt2_idx",
        using: "BTREE",
        fields: [
          { name: "exs_login" },
        ]
      },
    ]
  });
};
