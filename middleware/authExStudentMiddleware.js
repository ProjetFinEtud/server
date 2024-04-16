const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Récupérer le token du header Authorization

  const accessToken = req.headers["accesstoken"];
    if (!accessToken) {
      return res.status(401).json("L'utilisateur n'est pas connecté");
    }
  
    try {
      const decoded = jwt.verify(accessToken, 'secretkey');
      if(decoded.userType === "exStudent"){
        req.user = decoded; 
        next();
      }else{
        return res.status(401).json("L'utilisateur n'est pas connecté");
      }
    } catch (error) {
      return res.status(403).json("Token invalide");
    }
};
