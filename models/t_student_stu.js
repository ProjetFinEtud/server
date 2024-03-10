const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_student_stu', {
    stu_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stu_nom: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    stu_prenom: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    stu_email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    stu_anneediplome: {
      type: DataTypes.INTEGER,
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
    tableName: 't_student_stu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "stu_id" },
        ]
      },
      {
        name: "fk_Etudiant_cProfil1_idx",
        using: "BTREE",
        fields: [
          { name: "cpt_login" },
        ]
      },
      {
        name: "fk_Etudiant_Master1_idx",
        using: "BTREE",
        fields: [
          { name: "mas_id" },
        ]
      },
    ]
  });
};
