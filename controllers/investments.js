const mongoose = require("mongoose");
require("../models/investment");

const Investment = mongoose.model("investment");

const investments = {
  create: (req, res) => {
    console.log("Creating event");
    const { userId, title, amount } = req.body;
    const investment = new Investment({
      userId,
      title,
      amount,
    });

    investment
      .save()
      .then((data) => {
        console.log(data);
        res.json({ message: "success", data });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  get: (req, res, id) => {
    Investment.findById(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getUserInvestments: (req, res) => {
    Investment.find({ userId: req.params.id }, {})
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getAll: (req, res) => {
    Investment.find({ userId: req.params.id })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  delete: (req, res) => {
    Investment.findByIdAndRemove(req.params.id)
      .then((data) => {
        console.log(data);
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({
          status: "error",
          message: "Failed to delete",
        });

        console.log(err);
      });
  },

  update: (req, res) => {
    console.log("updating");
    const { title, description, venue, date, time, userId, price } = req.body;
    Investment.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        venue,
        date,
        time,
        price,
        userId,
        _id: req.params.id,
      },
      {
        new: true,
      }
    )
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  togglePublish: (req, res, id) => {
    Investment.findById(req.params.id)
      .then((data) => {
        const isPublished = data.isPublished;
        console.log("publish 117: " + isPublished);
        if (isPublished === "true") {
          Investment.findByIdAndUpdate(
            req.params.id,
            {
              isPublished: false,
              _id: req.params.id,
            },
            {
              new: true,
            }
          )
            .then((data) => {
              // console.log("is published: "+data);
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Investment.findByIdAndUpdate(
            req.params.id,
            {
              isPublished: true,
              _id: req.params.id,
            },
            {
              new: true,
            }
          )
            .then((data) => {
              console.log("is published: " + data);
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  toggleComplete: (req, res, id) => {
    Investment.findById(req.params.id)
      .then((data) => {
        const isCompleted = data.isCompleted;
        console.log("complete 155: " + isCompleted);
        if (isCompleted === "true") {
          Investment.findByIdAndUpdate(
            req.params.id,
            {
              isCompleted: false,
              _id: req.params.id,
            },
            {
              new: true,
            }
          )
            .then((data) => {
              // console.log("is published: "+data);
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Investment.findByIdAndUpdate(
            req.params.id,
            {
              isCompleted: true,
              _id: req.params.id,
            },
            {
              new: true,
            }
          )
            .then((data) => {
              console.log("is published: " + data);
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = investments;
