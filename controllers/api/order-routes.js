const router = require("express").Router();
const { Order } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Order.findAll()
    .then((dbOrderData) => res.json(dbOrderData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  //create a order on a post//
  Order.create({
    name: req.body.name,
    user_id: req.session.user_id,
    customer_id: req.body.customer_id,
  })
    .then((dbOrderData) => res.json(dbOrderData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  //delete a order from a post
  Order.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbOrderData) => {
      if (!dbOrderData) {
        res.status(404).json({
          message: "No order found with this id!",
        });
        return;
      }
      res.json(dbOrderData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
