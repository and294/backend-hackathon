var express = require('express');
var router = express.Router();
let moment = require("moment");

const Voyage = require("../models/home");
const Trip = require("../models/trips");

router.post("/", (req, res) => {
  let newDate =
    req.body.date.slice(6, 10) +
    "-" +
    req.body.date.slice(3, 5) +
    "-" +
    req.body.date.slice(0, 2);
  let formatedDate = moment(newDate).format("YYYY-MM-DD");
  Voyage.find({
    departure: req.body.departure,
    arrival: req.body.arrival,
  }).then((data) => {
    if (data.length > 1) {
      let filtered = data.filter(
        (e) => moment(e.date).format("YYYY-MM-DD") === formatedDate
      );
      res.json({ trips: filtered });
    } else {
      res.json({ trips: false });
    }
  });
});

router.post("/add", (req, res) => {
  const newTrip = new Trip({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: new Date(),
    price: req.body.price,
  });

  newTrip.save().then((data) => {
    res.json({ result: true, trip: data });
  });
});


module.exports = router;
