const jwt = require("jsonwebtoken");

const verifToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.id = decoded.id;
        next();
    });
}
const verifToken2 = (req, res, next) => {
    const accessToken = req.headers["accesstoken"];
    if (!accessToken) {
      return res.status(401).json("L'utilisateur n'est pas connecté");
    }
  
    try {
      const decoded = jwt.verify(accessToken, 'secretkey');
      req.user = decoded; // Ajouter les informations de l'utilisateur au req pour une utilisation ultérieure
      next();
    } catch (error) {
      return res.status(403).json("Token invalide");
    }
  };
  
  module.exports = verifToken2;
  


module.exports = {verifToken2}