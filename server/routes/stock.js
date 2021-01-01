const express = require("express");
const router = express.Router();
const db = require("../db/models/database");
const av = require("../lib/api/alphavantage");

router.get("/", function (req, res, next) {
  //TODO: handle general query
  res.send("returning all");
});

//GET overview
router.get("/:symbol/overview", async (req, res, next) => {
  const symbol = req.params.symbol;

  try{
    const stock = await db.stock.findOne({
      where:{
        symbol: symbol.toUpperCase()
      }
    });
    
    let status = 0;
    let data = ""; 
    
    if (stock === null) {
      status = 204;
      data = "{\"message\": \"symbol not found.\"}";
    } else {
      status = 200;
      data = JSON.stringify(stock, null, 2);
    }

    console.log("success status: " + status + ", data: " + data);
    res.status(status);
    res.send(data);
  }catch(err){
    console.error("Stock GET error: ", err); 
    res.send("error retrieving: ", err);
  }
});

//POST overview
router.post("/:symbol/overview", async (req, res, next) => {
  const symbol = req.params.symbol;
  
  try{
    const overview = await av.getOverview(symbol);
    
    let status = 0;
    let data = "";

    if (Object.keys(overview).length === 0){
      status = 501;
      data = "{\"message\": \"not supported.\"}";
    } else {
      const newStock = await db.stock.create({
        symbol: overview.Symbol,
        name: overview.Name,
        sector: overview.Sector,
        industry: overview.Industry,
        description: overview.Description,
      });

      status = 200;
      data = JSON.stringify(newStock, null, 2);
    }
    
    res.status(status);
    res.send(data);
  }catch(err){
    console.error("Stock POST error: ", err); 
    res.send("error creating: ", err);
  }
});

//GET time series
router.get("/:symbol/time_series", async (req, res, next) => {
  const symbol = req.params.symbol;

  try{

    const timeSeries = await db.stock.findAll({
      attributes: ["symbol"],
      where: {
        symbol: symbol.toUpperCase()
      },
      include: db.data,
      order: [
        [db.data, 'date', 'ASC']
      ]
    });
    
    let status = 0;
    let data = ""; 
    
    if (timeSeries === null) {
      status = 204;
      data = "{\"message\": \"symbol not found.\"}";
    } else {
      status = 200;
      data = JSON.stringify(timeSeries , null, 2);
    }

    console.log("success status: " + status + ", data: " + data);
    res.status(status);
    res.send(data);
  }catch(err){
    console.error("Stock GET error: ", err); 
    res.send("error retrieving: ", err);
  }
});

//POST time series
router.post("/:symbol/time_series", async (req, res, next) => {
  const symbol = req.params.symbol;
  
  try{
    const overview = await av.getOverview(symbol);
    
    let status = 0;
    let data = "";

    if (Object.keys(overview).length === 0){
      status = 501;
      data = "{\"message\": \"not supported.\"}";
    } else {
      const newStock = await db.stock.create({
        symbol: overview.Symbol,
        name: overview.Name,
        sector: overview.Sector,
        industry: overview.Industry,
        description: overview.Description,
      });

      status = 200;
      data = JSON.stringify(newStock, null, 2);
    }
    
    res.status(status);
    res.send(data);
  }catch(err){
    console.error("Stock POST error: ", err); 
    res.send("error creating: ", err);
  }
});

module.exports = router;
