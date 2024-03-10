const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/db");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const { generateRandomPassword } = require("../function/function.js");
const { sendEmailWelcome, sendEmailForgotPassword } = require("../function/mailerApi.js");
require("dotenv").config();

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await models.t_compte_cpt.findOne({
      where: { cpt_login: username.toLowerCase(), cpt_etat: 1 },
      attributes: ["cpt_login", "cpt_type", "cpt_mdp"], 
    });

    if (!user) {
      return res.status(401).json({ message: "Nom d'utilisateur incorrect" });
    }
    let firstCon = password === username.toLowerCase();

    let verif1 = await bcrypt.compare(password, user.cpt_mdp);

    if (firstCon && verif1) {
      return res.status(201).json({ message: "Chagement de mot de passe" });
    }
    let verif = await bcrypt.compareSync(password, user.cpt_mdp);

    if (!verif) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Générer un jeton JWT avec les données de l'utilisateur
    const token = jwt.sign(
      { username: user.cpt_login, userType: user.cpt_type },
      process.env.SECRETKEY,
      {
        expiresIn: "1d",
      }
    );

    const currentDate = sequelize.literal("CURRENT_TIMESTAMP");

     await models.t_compte_cpt.update(
      {cpt_update : currentDate},
      {where : {cpt_login : username}},
    )

    if (user.cpt_type === "admin") {
      res.status(202).json({ token });
    } else {
      res.status(200).json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};

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
exports.verifAuth = async (req, res) => {
  const accessToken = req.headers["accesstoken"];
  console.log(accessToken);
  if (!accessToken) {
    return res.status(401).json("L'utilisateur n'est pas connecté");
  }

  try {
    const decoded = jwt.verify(accessToken, "secretkey");
    console.log(decoded);
    if (decoded.userType === "admin") {
      res.status(202).json("Utilisateur Admin");
    } else if (decoded.userType === "exStudent") {
      res.status(203).json("Utilisateur Ancien Etudiant");
    } else if (decoded.userType === "student") {
      res.status(204).json("Utilisateur Etudiant");
    }
  } catch (error) {
    return res.status(403).json("Token invalide");
  }
};

exports.createUserStudent = async (req, res) => {
  try {
    const { nom, prenom, email, master, annee } = req.body;
    const nomUti = prenom.toLowerCase() + "." + nom.toLowerCase() + annee;

    const existingUser = await models.t_student_stu.findOne({
      where: { stu_email: email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Un utilisateur avec cet e-mail existe déjà" });
    }
    const existingUser2 = await models.t_student_stu.findOne({
      where: { cpt_login: nomUti },
    });

    if (existingUser2) {
      return res
        .status(400)
        .json({ message: "Un utilisateur avec ce pseudo existe déjà" });
    }

    // Générer un sel pour le hachage avec bcrypt
    const salt = await bcrypt.genSalt();

    // Hacher le mot de passe avec le sel
    const password = await bcrypt.hash(nomUti, salt);

    // date actuelle
    const currentDate = sequelize.literal("CURRENT_TIMESTAMP");

    // Créer l'utilisateur
    const newUser = await models.t_compte_cpt.create({
      cpt_login: nomUti,
      cpt_mdp: password,
      cpt_type: "student",
      cpt_creation: currentDate,
      cpt_update: currentDate,
      cpt_etat: 0,
    });

    // Enregistrer l'utilisateur étudiant
    await models.t_student_stu.create({
      stu_nom: nom,
      stu_prenom: prenom,
      stu_email: email,
      mas_id: master,
      cpt_login: nomUti,
      stu_anneediplome: annee,
      // Autres champs à insérer dans la base de données
    });

    // Envoyer un email de confirmation
    await sendEmailWelcome(email);

    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};

exports.createUserExStudent = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      master,
      annee,
      domaine,
      longitude,
      laltitude,
      nom_poste,
      nom_entreprise,
      description,
      annee_debut,
      annee_fin,
    } = req.body;
    const nomUti = prenom.toLowerCase() + "." + nom.toLowerCase() + annee;

    // Vérifier si l'utilisateur existe déjà avec le même e-mail
    const existingUser = await models.t_exstudent_exs.findOne({
      where: { exs_email: email },
    });

    console.log("les années : " + annee + " " + annee_debut + " " + annee_fin)
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Un utilisateur avec cet e-mail existe déjà" });
    }
    const existingUser2 = await models.t_exstudent_exs.findOne({
      where: { cpt_login: nomUti },
    });

    if (existingUser2) {
      return res
        .status(400)
        .json({ message: "Un utilisateur avec ce pseudo existe déjà" });
    }

    // Générer un sel pour le hachage avec bcrypt
    const salt = await bcrypt.genSalt();

    // Hacher le mot de passe avec le sel
    const password = await bcrypt.hash(nomUti, salt);

    // date actuelle
    const currentDate = sequelize.literal("CURRENT_TIMESTAMP");

    // Créer l'utilisateur
    const newUser = await models.t_compte_cpt.create({
      cpt_login: nomUti,
      cpt_mdp: password,
      cpt_type: "exStudent",
      cpt_creation: currentDate,
      cpt_update: currentDate,
      cpt_etat: 0,
    });

    // Enregistrer l'utilisateur ancien étudiant
    const exstudent = await models.t_exstudent_exs.create({
      exs_nom: nom,
      exs_prenom: prenom,
      exs_email: email,
      exs_login: nomUti,
      exs_anneediplome: parseInt(annee),
      exs_longitude: longitude,
      exs_laltitude: laltitude,
      cpt_login: nomUti,
      mas_id: master,
      dom_id: domaine,
    });


    if (
      (nom_poste && nom_entreprise) ||
      description ||
      annee_debut ||
      annee_fin
    ) {
      await models.t_poste_pos.create({
        pre_id: nom_poste,
        pos_entreprise: nom_entreprise,
        pos_description: description,
        pos_debut: parseInt(annee_debut),
        pos_fin: parseInt(annee_fin),
        exs_id: exstudent.exs_id,
      });
    }else{
      
      await models.t_poste_pos.create({
        pre_id: 1,
        pos_entreprise: "Aucun",
        pos_description: "Pas de poste actuellement",
        exs_id: exstudent.exs_id,
      });
    }

    // Envoyer un email de confirmation
    const response = await sendEmailWelcome(email);

    if(response === 400){
      return res.status(401).message("Adresse email invalide")
    }

    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};

exports.Updatepass = async (req, res) => {
  try {
    const { username, password, newpassword, confirmpassword } = req.body;

    const existingUser = await models.t_compte_cpt.findOne({
      where: { cpt_login: username },
    });
    console.log(existingUser);

    if (!existingUser) {
      return res.status(401).json({ message: "L'utilisateur n'existe pas" });
    }
    let verif = await bcrypt.compareSync(password, existingUser.cpt_mdp);

    console.log(verif);
    if (!verif) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Générer un sel pour le hachage avec bcrypt
    const salt = await bcrypt.genSalt();

    console.log(salt);

    // Hacher le mot de passe avec le sel
    const hashpass = await bcrypt.hash(newpassword, salt);

    await models.t_compte_cpt.update(
      { cpt_mdp: hashpass },
      { where: { cpt_login: username } }
    );

    res.status(200).json({ message: "Mot de passe mise à jour avec succès" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
exports.ResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    var existingUser = null

    const existingExsUser = await models.t_exstudent_exs.findOne({
      include: [
        {
          model: models.t_compte_cpt,
          as: "cpt_login_t_compte_cpt",
          required: true,
          where: {
            cpt_etat: 1,
          },
          attributes: ["cpt_etat", "cpt_type", "cpt_creation", "cpt_login"],
        },
      ],
      where: { exs_email : email },
    });
    const existingStuUser = await models.t_student_stu.findOne({
      include: [
        {
          model: models.t_compte_cpt,
          as: "cpt_login_t_compte_cpt",
          required: true,
          where: {
            cpt_etat: 1,
          },
          attributes: ["cpt_etat", "cpt_type", "cpt_creation", "cpt_login"],
        },
      ],
      where: { stu_email : email },
    });

    if(existingExsUser){
      existingUser = existingExsUser
    }else{
      existingUser = existingStuUser
    }


    if (!existingUser) {
      return res.status(400).json({ message: "L'utilisateur n'existe pas" });
    }


    // Générer un sel pour le hachage avec bcrypt
    const salt = await bcrypt.genSalt();

    const password = generateRandomPassword(7)

    // Hacher le mot de passe avec le sel
    const hashpass = await bcrypt.hash(password, salt);

    await models.t_compte_cpt.update(
      { cpt_mdp: hashpass },
      { where: { cpt_login: existingUser.cpt_login } }
    );

    sendEmailForgotPassword(email, password)

    res.status(200).json({ message: "Mot de passe mise à jour avec succès" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

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

exports.allPostes = async (req, res) => {
  try {
    const postes = await models.t_preposte_pre.findAll();
    res.json({ postes });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
