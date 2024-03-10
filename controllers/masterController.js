const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");
var initModels = require("../models/init-models");
var models = initModels(sequelize);


exports.allMaster = async (req, res) => {
  try {
    const columns = await models.t_master_mas.findAll();
    res.json({ columns });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
exports.updateMaster = async (req, res) => {
  try {
    const {mas_nom, mas_id, mas_description} = req.body
    const result = await models.t_master_mas.update(
        { mas_nom: mas_nom, mas_description:mas_description},
        { where: { mas_id:mas_id } }
      );

      res
      .status(200)
      .json({ message: "Mise à jout du master reussi" });

  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
exports.addMaster = async (req, res) => {
    const {mas_nom, mas_description} = req.body
  try {
    const result = await models.t_master_mas.create(
        { mas_nom: mas_nom, mas_description : mas_description}
      );

      res
      .status(200)
      .json({ message: result.mas_id });

  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

