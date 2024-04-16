const sequelize = require("../config/db");
var initModels = require("../models/init-models");
var models = initModels(sequelize);

exports.getAllPostesUser = async (req, res) => {
  username = req.user.username;
  try {
    const exstudent = await models.t_exstudent_exs.findOne({
      where: { cpt_login: username },
    });

    const postes = await models.t_poste_pos.findAll({
      where: { exs_id: exstudent.exs_id },
    });
    res.status(200).json({ postes });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

exports.getAllPrePostes = async (req, res) => {
  try {
    const pre_post = await models.t_preposte_pre.findAll();

    res.status(200).json({ pre_post });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

exports.createPreposte = async (req, res) => {
  try {
    const { nom } = req.body;
    const username = req.user.username;

    const existingUser = await models.t_admin_adm.findOne({
      where: { cpt_login: username },
    });

    if (!existingUser) {
      return res.status(400).json({ message: "Admin non trouver" });
    }
    await models.t_preposte_pre.create({
      pre_nom: nom,
      adm_id: existingUser.adm_id,
    });

    res.status(200).json({ message: "Poste créé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};

exports.updatePosteExStudent = async (req, res) => {
  try {
    const { nomPoste, descriptionPoste, nomEntreprise, dateDebut, dateFin } =
      req.body;
    const id = req.params.id;

    const username = req.user.username;
    const existingUser = await models.t_exstudent_exs.findOne({
      where: { cpt_login: username },
    });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Un utilisateur avec cet e-mail existe déjà" });
    }

    // Créer l'utilisateur
    const newUser = await models.t_poste_pos.update(
      {
        pos_entreprise: nomEntreprise,
        pos_debut: dateDebut,
        pos_fin: dateFin,
        pos_description: descriptionPoste,
        pre_id: nomPoste,
        exs_id: existingUser.exs_id,
      },
      { where: { pos_id: id } }
    );

    res.status(200).json({ message: "Poste créé avec succès", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};

exports.createPosteExStudent = async (req, res) => {
  try {
    const { nomPoste, descriptionPoste, nomEntreprise, dateDebut, dateFin } =
      req.body;
    const username = req.user.username;

    // Vérifier si l'utilisateur existe déjà avec le même e-mail
    const existingUser = await models.t_exstudent_exs.findOne({
      where: { cpt_login: username },
    });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Un utilisateur avec cet e-mail existe déjà" });
    }

    // Créer l'utilisateur
    const newUser = await models.t_poste_pos.create({
      pos_entreprise: nomEntreprise,
      pos_debut: dateDebut,
      pos_fin: dateFin,
      pos_description: descriptionPoste,
      pre_id: nomPoste,
      exs_id: existingUser.exs_id,
    });

    res.status(200).json({ message: "Poste créé avec succès", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};

exports.updatePreposte = async (req, res) => {
  try {
    const { nom } = req.body;
    const username = req.user.username;
    const id = req.params.id;

    const existingUser = await models.t_admin_adm.findOne({
      where: { cpt_login: username },
    });

    if (!existingUser) {
      return res.status(400).json({ message: "Admin non trouver" });
    }
    await models.t_preposte_pre.update(
      { pre_nom: nom },
      { where: { pre_id: id } }
    );

    res.status(200).json({ message: "Poste créé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};
