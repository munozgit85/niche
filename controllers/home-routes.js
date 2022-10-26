const router = require('express').Router()
const sequelize = require('sequelize')
// eslint-disable-next-line object-curly-spacing
const { User, Customer, Order } = require('../models')
const withAuth = require('../utils/auth')

// get all customer for order handlebar
router.get('/', withAuth, (req, res) => {
    Customer.findAll({
        attributes: ['id', 'customer_name', 'customer_phone', 'created_at'],
        include: [
            {
                model: Order,
                attributes: ['order_id', 'name', 'customer_id'],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
        .then((dbCustomerData) => {
            const posts = dbCustomerData.map((post) =>
                post.get({ plain: true })
            )
            res.render('homepage', { posts })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})

// get single post
router.get('/customer/:id', (req, res) => {
    Customer.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'customer_name', 'customer_phone', 'created_at'],
        include: [
            {
                model: Order,
                attributes: ['order_id', 'name', 'customer_id'],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
        .then((dbCustomerData) => {
            if (!dbCustomerData) {
                res.status(404).json({ message: 'No post found with this id' })
                return
            }

            const post = dbCustomerData.get({ plain: true })

            res.render('single-post', {
                post,
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
})


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


module.exports = router
