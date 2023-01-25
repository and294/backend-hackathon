var express = require("express");
var router = express.Router();
let moment = require("moment");

const Booked = require("../models/booked");
const Trip = require("../models/trips");

router.post("/book", (req, res) => {
  Trip.findOne({
    departure: req.body.departure,
    arrival: req.body.arrival,
  }).then((data) => {
    if(data)
    {
      //for(let i = 0; i < data.length; i++){
              let hour =
        moment(data.date).hour() + ":" + moment(data.date).minute();
      let dateHour = new Date(data.date).getHours();
      console.log(dateHour)
        console.log(data.date);
        const newBooking = new Booked({
          departure: req.body.departure,
          arrival: req.body.arrival,
          time: hour,
          wait: dateHour - new Date().getHours(),
        });

        newBooking.save().then((data) => {
          res.json({ result: true, booking: data });
        });
      //}    
    } else {
        res.json({ result: false});
      }
  });
});

router.get("/", (req, res) => {
  Trip.find().then((data) => {
    res.json({ cart: data });
  });
});

router.delete("/:id", (req, res) => {
  Trip.deleteOne({_id: req.params.id}).then((data) => {
    console.log(data)
    if (data.deletedCount > 0) {
      res.json({ result: true, trips: data });
    } else {
      res.json({ result: false, error: "Trip not found" });
    }
  });
});

module.exports = router;
