const express = require("express");
const router = express.Router();
const db = require("../db/models/database");

router.get("/", function (req, res, next) {
  //TODO: handle general query
  res.send("returning all");
});

router.get("/:symbol", async (req, res, next) => {
  const symbol = req.params.symbol;

  if (!symbol) {
    //handle undefined params
    const err = {
      name: "error",
      constraint: "missing params",
    };
    res.send(err);
  } else {
    try{
      const stock = await db.stock.findAll({
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

router.post("/:symbol", async (req, res, next) => {
  const symbol = req.params.symbol;

  if (!symbol) {
    //handle undefined params
    const err = {
      name: "error",
      constraint: "missing params",
    };
    res.send(err);
  } else {
    console.log('saving'); 
  }
  // const newStock = db.stock.build({
  //   symbol: body.symbol,
  //   company: body.company,
  //   sector: body.sector,
  //   industry: body.industry,
  // });

  // newStock
  //   .save()
  //   .then((saveres) => {
  //     console.log("new stock saved: ", saveres);
  //   })
  //   .catch((err) => {
  //     console.error("error saving new stock: ", err);
  //   });
});

module.exports = router;
