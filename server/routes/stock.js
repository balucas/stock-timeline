var express = require("express");
var router = express.Router();
var db = require("../db/models/database");

router.get("/", function (req, res, next) {
  //TODO: handle general query
  res.send("returning all");
});

router.get("/:symbol", async (req, res, next) => {
  var symbol = req.params.symbol;

  if (!symbol) {
    //handle undefined params
    let err = {
      name: "error",
      constraint: "missing params",
    };
    res.send(err);
  } else {
    try{
      let stock = await db.stock.findAll({
        where:{
          symbol: symbol.toUpperCase()
        }
      });
      console.log('get symbol: ', stock);
      res.send(JSON.stringify(stock, null, 2));
    }catch(err){
      console.error("error getting symbol: ", err);
      res.send("error retrieving: ", err);
    }
  }
});

router.post("/:symbol", function (req, res, next) {
  var body = req.body;

  var newStock = db.stock.build({
    symbol: body.symbol,
    company: body.company,
    sector: body.sector,
    industry: body.industry,
  });

  newStock
    .save()
    .then((saveres) => {
      console.log("new stock saved: ", saveres);
    })
    .catch((err) => {
      console.error("error saving new stock: ", err);
    });
});

module.exports = router;
