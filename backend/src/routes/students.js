const router = require('express').Router();
const { apply } = require('../controllers/studentController');

router.post('/apply', apply);

module.exports = router;
