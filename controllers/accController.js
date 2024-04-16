const sequelize = require("../config/db");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.updateAcc = async (req, res) => {
  try {
    const { title, text } = req.body;
    const id = req.params.id;
    await models.t_accueil_acc.update(
      { acc_titre: title, acc_texte: text },
      { where: { acc_id: id } }
    );

    res.status(200).json({ message: "Accueil créé update succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de update" });
  }
};

exports.getAllAcc = async (req, res) => {
  try {
    const columns = await models.t_accueil_acc.findAll();
    res.json({ columns });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des textes de l'acceuil",
      });
  }
};
