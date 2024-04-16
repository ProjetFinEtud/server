const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const {
  sendEmailValidation,
  sendDeletUserIvalide,
} = require("../function/mailerApi.js");

exports.getAllUsers = async (req, res) => {
  try {
    const columns = await models.t_compte_cpt.findAll();
    res.json({ columns });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

// importer dans acc
exports.getAllAcc = async (req, res) => {
  try {
    const columns = await models.t_accueil_acc.findAll();
    res.json({ columns });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des textes de l'acceuil" });
  }
};

// importer dans poste
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

// importer dans contact
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

// importer dans contatc
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

// importer dans contact
exports.deleteRequestContact = async (req, res) => {
  const  con_id  = req.params.id;
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

// importer dans contact
exports.refusedRequestContact = async (req, res) => {
  const  con_id  = req.params.id;
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
exports.changeLocalisation = async (req, res) => {
  username = req.user.username;
  const { lat, lng } = req.body;
  console.log(req.body);
  try {
    const columns = await models.t_exstudent_exs.update(
      { exs_laltitude: lat, exs_longitude: lng },
      { where: { cpt_login: username } }
    );
    res.json({ message: "Modification éffectuer" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur lors de la récupération des demandes de contacts",
    });
  }
};
// importer dans poste
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
// importer dans poste
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

exports.deleteUser = async (req, res) => {
  const { user_id, user_type, raisonSup } = req.body;
  let mail;
  var existingUser;
  try {
    if (user_type === "exStudent") {
      existingUser = await await models.t_exstudent_exs.findOne({
        where: { exs_id: user_id },
      });
      await models.t_contact_con.destroy({
        where: { exs_login: existingUser.cpt_login },
      });
      await models.t_poste_pos.destroy({
        where: { exs_id: user_id },
      });
      await models.t_exstudent_exs.destroy({
        where: { exs_id: user_id },
      });

      mail = "exs_email";
    } else if (user_type === "student") {
      existingUser = await await models.t_student_stu.findOne({
        where: { stu_id: user_id },
      });
      await models.t_contact_con.destroy({
        where: { stu_login: existingUser.cpt_login },
      });
      await models.t_student_stu.destroy({
        where: { stu_id: user_id },
      });
      mail = "stu_email";
    }

    if (existingUser) {
      console.log("login " + existingUser.cpt_login);
      await models.t_compte_cpt.destroy({
        where: { cpt_login: existingUser.cpt_login },
      });
    }
    console.log(raisonSup);
    sendDeletUserIvalide(existingUser[mail], raisonSup);
    res.status(200).json({ message: "Suppression réussi" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
exports.userDeletehisAccount = async (req, res) => {
  const username = req.user.username;
  const user_type = req.user.userType;
  const raisonSup = req.body.raison;
  let mail;
  var existingUser;
  try {
    if (user_type === "exStudent") {
      existingUser = await await models.t_exstudent_exs.findOne({
        where: { cpt_login: username },
      });

      await models.t_contact_con.destroy({
        where: { exs_login: existingUser.cpt_login },
      });
      await models.t_poste_pos.destroy({
        where: { exs_id: existingUser.exs_id },
      });
      await models.t_exstudent_exs.destroy({
        where: { exs_id: existingUser.exs_id },
      });

      mail = "exs_email";
    } else if (user_type === "student") {
      existingUser = await await models.t_student_stu.findOne({
        where: { cpt_login: username },
      });
      await models.t_contact_con.destroy({
        where: { stu_login: existingUser.cpt_login },
      });
      await models.t_student_stu.destroy({
        where: { cpt_login: existingUser.cpt_login },
      });
      mail = "stu_email";
    }

    if (existingUser) {
      console.log("login " + existingUser.cpt_login);
      await models.t_compte_cpt.destroy({
        where: { cpt_login: existingUser.cpt_login },
      });
    }

    sendDeletUserIvalide(existingUser[mail], raisonSup);
    res.status(200).json({ message: "Suppression réussi" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

exports.Updatepass = async (req, res) => {
  try {
    const { username, password, newpassword, confirmpassword } = req.body;
    console.log("ok");
    const existingUser = await models.t_compte_cpt.findOne({
      where: { cpt_login: username },
    });

    if (!existingUser) {
      return res.status(401).json({ message: "L'utilisateur n'existe pas" });
    }
    let verif = await bcrypt.compareSync(password, existingUser.cpt_mdp);
    console.log(existingUser.cpt_mdp);
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
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
// impoter dans poste
exports.createPosteExStudent = async (req, res) => {
  try {
    const { nomPoste, descriptionPoste, nomEntreprise, dateDebut, dateFin } =
      req.body;

    console.log(nomPoste + " " + nomEntreprise + " " + dateDebut + " " + dateFin )
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
      pre_id : nomPoste,
      exs_id: existingUser.exs_id,
    });

    res.status(200).json({ message: "Poste créé avec succès", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};
// importer dans poste
exports.createPreposte = async (req, res) => {
  try {
    const { nom } =
      req.body;
    const username = req.user.username;

    const existingUser = await models.t_admin_adm.findOne({
      where: { cpt_login: username },
    });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Admin non trouver" });
    }
    await models.t_preposte_pre.create({
      pre_nom : nom, adm_id:existingUser.adm_id
    });

    res.status(200).json({ message: "Poste créé avec succès"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};
// importer dans poste
exports.updatePreposte = async (req, res) => {
  try {
    const { nom } =
      req.body;
    const username = req.user.username;
    const id = req.params.id

    const existingUser = await models.t_admin_adm.findOne({
      where: { cpt_login: username },
    });

    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Admin non trouver" });
    }
    await models.t_preposte_pre.update(
      {pre_nom : nom}, {where : {pre_id : id}}
      );

    res.status(200).json({ message: "Poste créé avec succès"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};
// importer dans poste
exports.updatePosteExStudent = async (req, res) => {
  try {
    const { nomPoste, descriptionPoste, nomEntreprise, dateDebut, dateFin } =
      req.body;
    const id = req.params.id

    console.log(nomPoste + " " + nomEntreprise + " " + dateDebut + " " + dateFin + " " + id)
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
    const newUser = await models.t_poste_pos.update({
      pos_entreprise: nomEntreprise,
      pos_debut: dateDebut,
      pos_fin: dateFin,
      pos_description: descriptionPoste,
      pre_id : nomPoste,
      exs_id: existingUser.exs_id,
    },{where : {pos_id : id}} );

    res.status(200).json({ message: "Poste créé avec succès", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};
exports.createAdmin = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const currentDate = sequelize.literal("CURRENT_TIMESTAMP");

    const nomUti = firstName.toLowerCase() + "." + lastName.toLowerCase();

    const salt = await bcrypt.genSalt();

    // Hacher le mot de passe avec le sel
    const hashpass = await bcrypt.hash(nomUti, salt);

    const newUser = await models.t_compte_cpt.create({
      cpt_login: nomUti,
      cpt_mdp: hashpass,
      cpt_type: "admin",
      cpt_creation: currentDate,
      cpt_update: currentDate,
      cpt_etat: 1,
    });

    // Vérifier si l'utilisateur existe déjà avec le même e-mail
    await models.t_admin_adm.create({
      adm_nom: firstName,
      adm_prenom: lastName,
      cpt_login: nomUti,
    });

    res.status(200).json({ message: "Poste créé avec succès", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de compte" });
  }
};
exports.creatAcc = async (req, res) => {
  try {
    const { title, text } = req.body;

    const username = req.user.username

    const admin = await models.t_admin_adm.findOne({
      where : {cpt_login : username}
    })

    const newUser = await models.t_accueil_acc.create({
      acc_titre: title, acc_texte: text, adm_id : admin.adm_id
    });


    res.status(200).json({ message: "Accueil créé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création" });
  }
};
// importer dans acc
exports.updateAcc = async (req, res) => {
  try {
    const { title, text } = req.body;
    const id = req.params.id
     await models.t_accueil_acc.update(
      {acc_titre: title, acc_texte: text},
      {where:{acc_id : id}},
    );


    res.status(200).json({ message: "Accueil créé update succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de update" });
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
exports.getLocalisation = async (req, res) => {
  try {
    const columns = await models.t_exstudent_exs.findAll({
      attributes: ["exs_id", "exs_laltitude", "exs_longitude"], // Sélectionnez les colonnes nécessaires
    });
    res.json({ columns });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
exports.activeUser = async (req, res) => {
  const exs_id = req.body.id;
  const type = req.body.type;
  let existingUser;
  let attribut_mail;

  if (type === "exStudent") {
    existingUser = await models.t_exstudent_exs.findOne({
      include: [
        {
          model: models.t_compte_cpt,
          as: "cpt_login_t_compte_cpt",
          required: true,
          where: {
            cpt_etat: 0,
          },
          attributes: ["cpt_etat", "cpt_type", "cpt_creation", "cpt_login"],
        },
      ],
      where: { exs_id: exs_id },
    });
    attribut_mail = "exs_email";
  } else if (type === "student") {
    existingUser = await models.t_student_stu.findOne({
      include: [
        {
          model: models.t_compte_cpt,
          as: "cpt_login_t_compte_cpt",
          required: true,
          where: {
            cpt_etat: 0,
          },
          attributes: ["cpt_etat", "cpt_type", "cpt_creation", "cpt_login"],
        },
      ],
      where: { stu_id: exs_id },
    });
    attribut_mail = "stu_email";
  } else {
    return res.status(400).send("Type d'utilisateur invalide !");
  }

  try {
    if (!existingUser) {
      return res.status(400).send("L'identifiant n'existe pas !");
    }

    await models.t_compte_cpt.update(
      { cpt_etat: 1 },
      { where: { cpt_login: existingUser.cpt_login } }
    );

    sendEmailValidation(
      existingUser[attribut_mail],
      existingUser.cpt_login,
      existingUser.cpt_login
    );

    return res.status(200).send("Utilisateur activé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'activation de l'utilisateur", error);
    return res
      .status(500)
      .send("Erreur lors de l'activation de l'utilisateur !");
  }
};
exports.activeUsers = async (req, res) => {
  const { pseudos } = req.body;
  console.log(pseudos);
  let existingUserExs, existingUserStu, existingUser;
  let attribut_mail;

  if (!pseudos || pseudos.length === 0) {
    return res.status(400).send("Aucun pseudo d'utilisateur fourni !");
  }

  try {
    await Promise.all(
      pseudos.map(async (pseudo) => {
        (existingUserStu = await models.t_student_stu.findOne({
          include: [
            {
              model: models.t_compte_cpt,
              as: "cpt_login_t_compte_cpt",
              required: true,
              where: {
                cpt_etat: 0,
              },
              attributes: ["cpt_etat", "cpt_type", "cpt_creation", "cpt_login"],
            },
          ],
          where: { cpt_login: pseudo },
        })),
          (existingUserExs = await models.t_exstudent_exs.findOne({
            include: [
              {
                model: models.t_compte_cpt,
                as: "cpt_login_t_compte_cpt",
                required: true,
                where: {
                  cpt_etat: 0,
                },
                attributes: [
                  "cpt_etat",
                  "cpt_type",
                  "cpt_creation",
                  "cpt_login",
                ],
              },
            ],
            where: { cpt_login: pseudo },
          }));

        if (existingUserExs) {
          attribut_mail = "exs_email";
          existingUser = existingUserExs;
        } else if (existingUserStu) {
          attribut_mail = "stu_email";
          existingUser = existingUserStu;
        } else {
          return res.status(400).send("L'identifiant n'existe pas !");
        }

        await models.t_compte_cpt.update(
          { cpt_etat: 1 },
          { where: { cpt_login: pseudo } }
        );
        console.log(attribut_mail);
         await sendEmailValidation(
          existingUser[attribut_mail],
          existingUser.cpt_login,
          existingUser.cpt_login
        );
      })
    );

    return res.status(200).send("Utilisateurs activés avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'activation des utilisateurs", error);
    return res
      .status(500)
      .send("Erreur lors de l'activation des utilisateurs !");
  }
};

exports.usersDesactived = async (req, res) => {
  try {
    // Récupérer les étudiants anciens désactivés
    const exstudents = await models.t_exstudent_exs.findAll({
      include: [
        {
          model: models.t_compte_cpt,
          as: "cpt_login_t_compte_cpt",
          required: true,
          where: {
            cpt_etat: 0,
          },
          attributes: ["cpt_etat", "cpt_type", "cpt_creation", "cpt_update"],
        },
        {
          model: models.t_domaine_dom,
          as: "dom",
          required: true,
          attributes: ["dom_icone"],
          attributes: ["dom_nom"],
        },
        {
          model: models.t_poste_pos,
          as: "t_poste_pos",
          required: false,
          attributes: [
            "pos_id",
            "pos_description",
            "pos_debut",
            "pos_fin",
            "pos_entreprise",
            "pre_id",
          ],
        },
        {
          model: models.t_master_mas,
          as: "ma",
          required: true,
          attributes: ["mas_nom"],
        },
      ],
    });

    // Récupérer les étudiants désactivés
    const students = await models.t_student_stu.findAll({
      include: [
        {
          model: models.t_compte_cpt,
          as: "cpt_login_t_compte_cpt",
          required: true,
          where: {
            cpt_etat: 0,
          },
          attributes: ["cpt_etat", "cpt_type", "cpt_creation"],
        },
        {
          model: models.t_master_mas,
          as: "ma",
          required: true,
          attributes: ["mas_nom"],
        },
      ],
    });

    // Fusionner les résultats des deux requêtes
    const users = [...exstudents, ...students];

    // Envoyer les utilisateurs fusionnés
    res.status(200).json(users);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

exports.usersActived = async (req, res) => {
  try {
    // Récupérer les étudiants anciens désactivés
    const exstudents = await models.t_exstudent_exs.findAll({
      include: [
        {
          model: models.t_compte_cpt,
          as: "cpt_login_t_compte_cpt",
          required: true,
          where: {
            cpt_etat: 1,
          },
          attributes: ["cpt_etat", "cpt_type", "cpt_creation", "cpt_update"],
        },
        {
          model: models.t_domaine_dom,
          as: "dom",
          required: true,
          attributes: ["dom_icone"],
          attributes: ["dom_nom"],
        },
        {
          model: models.t_poste_pos,
          as: "t_poste_pos",
          required: false,
          attributes: [
            "pos_id",
            "pos_description",
            "pos_debut",
            "pos_fin",
            "pos_entreprise",
            "pre_id",
          ],
        },
        {
          model: models.t_master_mas,
          as: "ma",
          required: true,
          attributes: ["mas_nom"],
        },
      ],
    });

    console.log(exstudents);

    // Récupérer les étudiants désactivés
    const students = await models.t_student_stu.findAll({
      include: [
        {
          model: models.t_compte_cpt,
          as: "cpt_login_t_compte_cpt",
          required: true,
          where: {
            cpt_etat: 1,
          },
          attributes: ["cpt_etat", "cpt_type", "cpt_creation", "cpt_update"],
        },
        {
          model: models.t_master_mas,
          as: "ma",
          required: true,
          attributes: ["mas_nom"],
        },
      ],
    });

    console.log(students);
    // Fusionner les résultats des deux requêtes
    const users = [...exstudents, ...students];
    console.log(users);
    // Envoyer les utilisateurs fusionnés
    res.status(200).json(users);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

exports.usersExstudentActived = async (req, res) => {
  try {
    // Récupérer les étudiants anciens désactivés
    const exstudents = await models.t_exstudent_exs.findAll({
      include: [
        {
          model: models.t_compte_cpt,
          as: "cpt_login_t_compte_cpt",
          required: true,
          where: {
            cpt_etat: 1,
          },
          attributes: ["cpt_etat", "cpt_type", "cpt_creation", "cpt_update"],
        },
        {
          model: models.t_domaine_dom,
          as: "dom",
          required: true,
          attributes: ["dom_id", "dom_nom", "dom_icone"],
        },
        {
          model: models.t_master_mas,
          as: "ma",
          required: true,
          attributes: ["mas_nom"],
        },
        {
          model: models.t_poste_pos,
          as: "t_poste_pos",
          required: false,
          attributes: ["pos_id", "pos_description", "pos_entreprise", "pre_id"],
        },
      ],
    });

    console.log(exstudents);
    // Envoyer les utilisateurs fusionnés
    res.status(200).json(exstudents);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
exports.userInfoExstudent = async (req, res) => {
  const cpt_login = req.user.username;
  try {
    // Récupérer les étudiants anciens désactivés
    const exstudents = await models.t_exstudent_exs.findOne({
      where: { cpt_login: cpt_login },
    });

    console.log(exstudents);
    // Envoyer les utilisateurs fusionnés
    res.status(200).json(exstudents);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
exports.userInfoAdmin = async (req, res) => {
  const cpt_login = req.user.username;
  try {
    // Récupérer les étudiants anciens désactivés
    const admin = await models.t_admin_adm.findOne({
      where: { cpt_login: cpt_login },
    });

    console.log(admin);
    // Envoyer les utilisateurs fusionnés
    res.status(200).json(admin);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
exports.userInfoStudent = async (req, res) => {
  const cpt_login = req.user.username;
  try {
    // Récupérer les étudiants anciens désactivés
    const student = await models.t_student_stu.findOne({
      where: { cpt_login: cpt_login },
    });

    console.log(student);
    // Envoyer les utilisateurs fusionnés
    res.status(200).json(student);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

exports.updateExsinfo = async (req, res) => {
  try {
    console.log("okokko" + req.user.username);
    const { exs_nom, exs_prenom, exs_email, exs_description } = req.body;
    const cpt_login = req.user.username;
    var image = null;
    if (req.file && req.file.filename !== null) {
      image = req.file.filename;
    }

    const result = await models.t_exstudent_exs.update(
      {
        exs_nom: exs_nom,
        exs_prenom: exs_prenom,
        exs_email: exs_email,
        exs_description: exs_description,
      },
      { where: { cpt_login: cpt_login } }
    );
    if (image) {
      const result1 = await models.t_exstudent_exs.update(
        { exs_photo: image },
        { where: { cpt_login: cpt_login } }
      );
    }
    res.status(200).json({ message: "Domaine mis à jour avec succès" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
exports.updateExspassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    console.log("okok" + req.body);
    const username = req.user.username;

    const existingUser = await models.t_compte_cpt.findOne({
      where: { cpt_login: username },
    });

    if (!existingUser) {
      return res.status(401).json({ message: "L'utilisateur n'existe pas" });
    }

    let verif = await bcrypt.compareSync(currentPassword, existingUser.cpt_mdp);

    if (!verif) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Générer un sel pour le hachage avec bcrypt
    const salt = await bcrypt.genSalt();

    //console.log(salt);

    // Hacher le mot de passe avec le sel
    const hashpass = await bcrypt.hash(newPassword, salt);

    await models.t_compte_cpt.update(
      { cpt_mdp: hashpass },
      { where: { cpt_login: username } }
    );

    res
      .status(200)
      .json({ message: "Mise à jour du mot de passe éffectué ave success" });
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

// Autres méthodes pour les opérations CRUD sur les utilisateurs
