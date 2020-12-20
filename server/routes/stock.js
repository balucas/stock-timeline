var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  //TODO: handle general query
  res.send("returning all");
});

router.get("/:symbol", function (req, res, next) {
  var symbol = req.params.symbol;

  if (!symbol) {
    //handle undefined params
    err = {
      name: "error",
      constraint: "missing params",
    };
    res.send(err);
  } else {
    res.send("returning symbols: " + symbol);
    //TODO: handle symbol query
  }
});

module.exports = router;
