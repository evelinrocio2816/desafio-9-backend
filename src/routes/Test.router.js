const express = require("express");
const router = express.Router();


router.get("/loggertest", (req, res)=>{
    req.logger.error("Error fatal");
    req.logger.debug("Mensaje de debug");
    req.logger.info("Mensaje de Info");
    req.logger.warning("Mensaje de Warning");
   
    res.send("Test de logs");
})
module.exports=router