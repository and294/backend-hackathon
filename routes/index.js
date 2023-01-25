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
    departure: { $regex: new RegExp(req.body.departure, "i") },
    arrival: { $regex: new RegExp(req.body.arrival, "i") },
  }).then((data) => {
    if (data.length > 1) {
      let filtered = data.filter(
        (e) => moment(e.date).format("YYYY-MM-DD") === req.body.date
      );
      res.json({ trips: filtered });
    } else {
      res.json({ trips: false });
    }
  });
});

router.post("/add/:id", (req, res) => {
  const {id} = req.params;
  Voyage.findById(id).then(data => {
     const newTrip = new Trip({
    departure: data.departure,
    arrival: data.arrival,
    date: data.date,
    price: data.price,
  });
  newTrip.save().then((data) => {
    res.json({ result: true, trip: data });
  }); 
  })
});


module.exports = router;
