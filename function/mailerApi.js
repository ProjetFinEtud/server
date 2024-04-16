require("dotenv").config();

const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const sendEmailWelcome = async (to) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "egel4666@gmail.com",
          Name: "Equipe pédagogique du Master Egel",
        },
        To: [
          {
            Email: to,
          },
        ],
        TemplateID: 5738020,
        TemplateLanguage: true,
        Subject: "Confirmation de l'inscription",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      return 400;
    });
};

const sendEmailForgotPassword = async (to, password) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "egel4666@gmail.com",
          Name: "Equipe pédagogique du Master Egel",
        },
        To: [
          {
            Email: to,
          },
        ],
        Variables: {
          password: password,
        },
        TemplateID: 5746158,
        TemplateLanguage: true,
        Subject: "Réinitialisation de votre mot de passe",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err);
    });
};

const sendEmailValidation = async (to, nomUti, password) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "egel4666@gmail.com",
          Name: "Equipe pédagogique du Master Egel",
        },
        To: [
          {
            Email: to,
          },
        ],
        Variables: {
          nomUti: nomUti,
          password: password,
        },
        TemplateID: 5746229,
        TemplateLanguage: true,
        Subject: "Validation de votre compte",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err);
    });
};
const sendDeletUserIvalide = async (to, message) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "egel4666@gmail.com",
          Name: "Equipe pédagogique du Master Egel",
        },
        To: [
          {
            Email: to,
          },
        ],
        Variables: {
          message: message,
        },
        TemplateID: 5759530,
        TemplateLanguage: true,
        Subject: "Inscription sur la carte interactive",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { sendEmailWelcome, sendEmailForgotPassword, sendEmailValidation, sendDeletUserIvalide };
