var DataTypes = require("sequelize").DataTypes;
var _t_accueil_acc = require("./t_accueil_acc");
var _t_admin_adm = require("./t_admin_adm");
var _t_compte_cpt = require("./t_compte_cpt");
var _t_contact_con = require("./t_contact_con");
var _t_domaine_dom = require("./t_domaine_dom");
var _t_exstudent_exs = require("./t_exstudent_exs");
var _t_master_mas = require("./t_master_mas");
var _t_poste_pos = require("./t_poste_pos");
var _t_preposte_pre = require("./t_preposte_pre");
var _t_student_stu = require("./t_student_stu");

function initModels(sequelize) {
  var t_accueil_acc = _t_accueil_acc(sequelize, DataTypes);
  var t_admin_adm = _t_admin_adm(sequelize, DataTypes);
  var t_compte_cpt = _t_compte_cpt(sequelize, DataTypes);
  var t_contact_con = _t_contact_con(sequelize, DataTypes);
  var t_domaine_dom = _t_domaine_dom(sequelize, DataTypes);
  var t_exstudent_exs = _t_exstudent_exs(sequelize, DataTypes);
  var t_master_mas = _t_master_mas(sequelize, DataTypes);
  var t_poste_pos = _t_poste_pos(sequelize, DataTypes);
  var t_preposte_pre = _t_preposte_pre(sequelize, DataTypes);
  var t_student_stu = _t_student_stu(sequelize, DataTypes);

  t_accueil_acc.belongsTo(t_admin_adm, { as: "adm", foreignKey: "adm_id"});
  t_admin_adm.hasMany(t_accueil_acc, { as: "t_accueil_accs", foreignKey: "adm_id"});
  t_admin_adm.belongsTo(t_compte_cpt, { as: "cpt_login_t_compte_cpt", foreignKey: "cpt_login"});
  t_compte_cpt.hasMany(t_admin_adm, { as: "t_admin_adms", foreignKey: "cpt_login"});
  t_contact_con.belongsTo(t_compte_cpt, { as: "stu_login_t_compte_cpt", foreignKey: "stu_login"});
  t_compte_cpt.hasMany(t_contact_con, { as: "t_contact_cons", foreignKey: "stu_login"});
  t_contact_con.belongsTo(t_compte_cpt, { as: "exs_login_t_compte_cpt", foreignKey: "exs_login"});
  t_compte_cpt.hasMany(t_contact_con, { as: "exs_login_t_contact_cons", foreignKey: "exs_login"});
  t_exstudent_exs.belongsTo(t_compte_cpt, { as: "cpt_login_t_compte_cpt", foreignKey: "cpt_login"});
  t_compte_cpt.hasMany(t_exstudent_exs, { as: "t_exstudent_exes", foreignKey: "cpt_login"});
  t_student_stu.belongsTo(t_compte_cpt, { as: "cpt_login_t_compte_cpt", foreignKey: "cpt_login"});
  t_compte_cpt.hasMany(t_student_stu, { as: "t_student_stus", foreignKey: "cpt_login"});
  t_exstudent_exs.belongsTo(t_domaine_dom, { as: "dom", foreignKey: "dom_id"});
  t_domaine_dom.hasMany(t_exstudent_exs, { as: "t_exstudent_exes", foreignKey: "dom_id"});
  t_poste_pos.belongsTo(t_exstudent_exs, { as: "ex", foreignKey: "exs_id"});
  t_exstudent_exs.hasMany(t_poste_pos, { as: "t_poste_pos", foreignKey: "exs_id"});
  t_exstudent_exs.belongsTo(t_master_mas, { as: "ma", foreignKey: "mas_id"});
  t_master_mas.hasMany(t_exstudent_exs, { as: "t_exstudent_exes", foreignKey: "mas_id"});
  t_student_stu.belongsTo(t_master_mas, { as: "ma", foreignKey: "mas_id"});
  t_master_mas.hasMany(t_student_stu, { as: "t_student_stus", foreignKey: "mas_id"});
  t_poste_pos.belongsTo(t_preposte_pre, { as: "pre", foreignKey: "pre_id"});
  t_preposte_pre.hasMany(t_poste_pos, { as: "t_poste_pos", foreignKey: "pre_id"});

  return {
    t_accueil_acc,
    t_admin_adm,
    t_compte_cpt,
    t_contact_con,
    t_domaine_dom,
    t_exstudent_exs,
    t_master_mas,
    t_poste_pos,
    t_preposte_pre,
    t_student_stu,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
