const router = require('express').Router();
//const bodyParser = require('body-parser').json();
const Category = require('../models/category-schema');

router
    .get('/', (req, res, next) => {
        Category.find()
            .lean()
            .then(categories => res.send(categories))
            .catch(next);
    });

module.exports = router;
