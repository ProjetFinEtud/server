const express = require('express');
const cors = require('cors');
const app = express();
const authMiddlewareAdmin = require('./middleware/authAdminMiddleware.js');
const authMiddlewareExStudent = require('./middleware/authExStudentMiddleware.js');
const authMiddleware = require('./middleware/authMiddleware.js');
const sequelize = require('./config/db');
const path = require("path")

// Synchronisez les modèles avec la base de données
sequelize.sync({ force: false }).then(() => {
  console.log('Modèles synchronisés avec la base de données.');
}).catch(err => {
  console.error('Erreur lors de la synchronisation des modèles avec la base de données :', err);
});


// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(cors());

// app.use(express.static("./client/build"))

// app.use("/", (_, res) => {
//   res.send("Hello word !")
// })

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userAdminRoutes.js');
const domaineRoutes = require('./routes/domaineRoutes.js')
const masterRoutes = require('./routes/masterRoutes.js')
const carteRoutes = require('./routes/carteRoutes.js')


app.use('/auth', authRoutes);
app.use('/user',authMiddleware, userRoutes);
app.use('/domaine',authMiddlewareAdmin, domaineRoutes);
app.use('/master',authMiddlewareAdmin, masterRoutes);
app.use('/carte', carteRoutes);

app.use('/images', express.static(path.join(__dirname, '../images/')));

// app.use("*/", (_, res) => {
//   res.sendFile(path.join(__dirname, 'client/build/index.html'))
// })




// Port d'écoute
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
