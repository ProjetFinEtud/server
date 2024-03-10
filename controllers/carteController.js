const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");
var initModels = require("../models/init-models");
var models = initModels(sequelize);


exports.allPosition = async (req, res) => {
  try {
    const {user} = req.body
    const datauser = await models.t_exstudent_exs.findOne({
        where:{cpt_login : user.username}
    });

    if(user.userType === "admin"){
        const exstudents = await models.t_exstudent_exs.findAll({
            include: [
              {
                model: models.t_compte_cpt,
                as: "cpt_login_t_compte_cpt",
                required: true,
                where: {
                  cpt_etat: 1,
                },
              },
              {
                model: models.t_domaine_dom,
                as: "dom",
                required: true,
                attributes: ["dom_nom"],
              },
              {
                model: models.t_master_mas,
                as: "ma",
                required: true,
                attributes: ["mas_nom"]
              },
            ]
          });
    }else{
        const exstudents = await models.t_exstudent_exs.findAll({
            include: [
              {
                model: models.t_compte_cpt,
                as: "cpt_login_t_compte_cpt",
                required: true,
                where: {
                  cpt_etat: 1,
                },
              },
              {
                model: models.t_domaine_dom,
                as: "dom",
                required: true,
                attributes: ["dom_nom"],
              },
              {
                model: models.t_master_mas,
                as: "ma",
                required: true,
                attributes: ["mas_nom"],
              },
            ],
            where : {mas_id : datauser.mas_id}
          });
    }

    res.json({ columns });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};