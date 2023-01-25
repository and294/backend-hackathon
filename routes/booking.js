var express = require("express");
var router = express.Router();
let moment = require("moment");

const Booked = require("../models/booked");


router.get("/", (req, res) => {
  Booked.find().then((data) => {
    res.json({ trips: data });
  });
});

module.exports = router;
