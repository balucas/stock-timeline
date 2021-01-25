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

    console.log("Time Series GET Success: " + status + ", data: " + data);
    res.status(status);
    res.send(data);
  }catch(err){
    console.error("Time Series GET error: ", err); 
    res.send("error retrieving: ", err);
  }
});

//POST time series
router.post("/:symbol/time_series", async (req, res, next) => {
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

    if(timeSeries === null || timeSeries.length == 0){
      status = 501;
      data = "{\"message\": \"stock not found.\"}";
    } else if(timeSeries[0].data && timeSeries[0].data.length > 0){
      status = 501;
      data = "{\"message\": \"time series already exists.\"}";
    } else {
      const newTimeSeries = await av.getTSWeekly(symbol);
      
      const ts = newTimeSeries["Weekly Adjusted Time Series"];
      const tsArr = [];

      Object.keys(ts).forEach( (datestr) => {
        let curr = ts[datestr];
        let week = {};
        
        week.date = new Date(datestr);
        week.open = parseFloat(curr["1. open"]);
        week.high = parseFloat(curr["2. high"]);
        week.low = parseFloat(curr["3. low"]);
        week.close = parseFloat(curr["4. close"]);
        
        tsArr.push(week);
      });

      status = 200;
      data = JSON.stringify(tsArr, null, 2);
      console.log("Time Series POST Success: " + status + ", data: " + tsArr.length);
    }
    
    res.status(status);
    res.send(data);
  }catch(err){
    console.error("Stock POST error: ", err); 
    res.send("error creating: ", err);
  }
});

module.exports = router;
