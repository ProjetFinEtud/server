const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Récupérer le token du header Authorization

  const accessToken = req.headers["accesstoken"];
  console.log(accessToken)
    if (!accessToken) {
      return res.status(401).json("L'utilisateur n'est pas connecté");
    }
    try {
      const decoded = jwt.verify(accessToken, 'secretkey');
      console.log(decoded)
        req.user = decoded; 
        next();
    } catch (error) {
      return res.status(403).json("Token invalide");
    }
};
