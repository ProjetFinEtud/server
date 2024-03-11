const crypto = require("crypto");
const multer = require("multer")
const bcrypt = require("bcryptjs");
const express = require('express');
// Fonction pour hacher un mot de passe avec SHA-256
function hashPassword(password) {
  const pass = password + "MasterEgel";
  const hash = crypto.createHash("sha256");
  hash.update(pass);
  const hashedPassword = hash.digest("hex");
  return hashedPassword;
}

// Fonction pour generer des mots de passe
function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

async function  message_id (stu_id, exs_id){
  const salt = await bcrypt.genSalt();

  // Hacher le mot de passe avec le sel
  const msg_id = await bcrypt.hash(stu_id+exs_id, salt);

  return msg_id
}

const storage = multer.diskStorage({
  destination:function(req, file, cb){
    cb(null, express.static(path.join(__dirname, '../../client/public/upload')))
    console.log(express.static(path.join(__dirname, '../../client/public/upload')))
  },
  filename:function(req, file, cb){
    cb(null, Date.now() + file.originalname) 
  }
})
const upload = multer({storage : storage})



module.exports ={generateRandomPassword, hashPassword, upload, message_id}
