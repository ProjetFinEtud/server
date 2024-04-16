const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.allDomaines = async (req, res) => {
  try {
    const columns = await models.t_domaine_dom.findAll();
    res.json({ columns });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
exports.updatedomaines = async (req, res) => {
  try {
    const { dom_nom, dom_icone, dom_id } = req.body;
    var image = null;
    if (req.file && req.file.filename !== null) {
      image = req.file.filename;
    }

    const result = await models.t_domaine_dom.update(
      { dom_nom: dom_nom },
      { where: { dom_id: dom_id } }
    );
    if (image) {
      const result1 = await models.t_domaine_dom.update(
        { dom_icone: image },
        { where: { dom_id: dom_id } }
      );
    }
    res.status(200).json({ message: "Domaine mis à jour avec succès", returnimage: image });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};



exports.adddomaines = async (req, res) => {
  try {
    const { dom_nom, dom_id } = req.body;
    var id = null
    var image = null;
    if (req.file && req.file.filename !== null) {
      image = req.file.filename;
    }

    if (image) {
      const result1 = await models.t_domaine_dom.create(
        { dom_icone: image, dom_nom : dom_nom },
      );
      id = result1.dom_id
    }

    res.status(200).json({ message: id, returnimage: image });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

exports.updateDomaine = async (req, res) => {
  console.log(req);
};
