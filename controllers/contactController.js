const sequelize = require("../config/db");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.geStudentContact = async (req, res) => {
  username = req.user.username;
  console.log(username);
  try {
    const columns = await models.t_contact_con.findAll({
      where: { stu_login: username },
    });

    console.log(columns);
    res.json({ columns });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur lors de la récupération des demandes de contacts",
    });
  }
};

exports.geExsContact = async (req, res) => {
  username = req.user.username;
  console.log(username);
  try {
    const columns = await models.t_contact_con.findAll({
      where: { exs_login: username },
    });
    console.log(columns);
    res.json({ columns });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur lors de la récupération des demandes de contacts",
    });
  }
};

exports.activeRequestContact = async (req, res) => {
  const con_id = req.params.id; // Récupérer l'ID à partir des paramètres de requête
  console.log("ID reçu :", con_id);
  try {
    const columns = await models.t_contact_con.update(
      { con_etat: "Accepter" },
      { where: { con_id: con_id } }
    );
    res.json({ message: "Modification effectuée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur lors de la récupération des demandes de contacts",
    });
  }
};

exports.deleteRequestContact = async (req, res) => {
  const con_id = req.params.id;
  console.log(con_id);
  try {
    const columns = await models.t_contact_con.destroy({
      where: { con_id: con_id },
    });
    res.json({ message: "Modification éffectuer" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur lors de la récupération des demandes de contacts",
    });
  }
};

exports.refusedRequestContact = async (req, res) => {
  const con_id = req.params.id;
  console.log(username);
  try {
    const columns = await models.t_contact_con.update(
      { con_etat: "Refuser" },
      { where: { con_id: con_id } }
    );
    res.json({ message: "Modification éffectuer" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur lors de la récupération des demandes de contacts",
    });
  }
};

exports.sendAsk = async (req, res) => {
  try {
    const { exs_id } = req.body;

    console.log("l'id de l'utilisateur : " + exs_id);

    const existingUser = await models.t_exstudent_exs.findOne({
      where: { exs_id: exs_id },
    });

    if (!existingUser) {
      return res.status(400).json({ message: "L'utilisateur n'existe pas" });
    }
    const stu_login = req.user.username;

    const existingContact = await models.t_contact_con.findOne({
      where: { exs_login: existingUser.cpt_login, stu_login: stu_login },
    });

    if (existingContact) {
      return res.status(403).json({
        message:
          "Vous avez déjà envoyé une demande de contact à cette personne",
      });
    }

    console.log("Les logins" + existingUser.cpt_login + " " + stu_login);

    const currentDate = sequelize.literal("CURRENT_TIMESTAMP");

    const msg_id = Date.now();

    console.log("message id" + msg_id);

    const newUser = await models.t_contact_con.create({
      con_etat: "Demande en cours",
      exs_login: existingUser.cpt_login,
      stu_login: stu_login,
      con_date: currentDate,
      msg_id: msg_id,
    });

    res
      .status(200)
      .json({ message: "Contact créé avec succès", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};
