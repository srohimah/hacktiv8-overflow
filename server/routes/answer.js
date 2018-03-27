var express = require('express');
var router = express.Router();
const {verify} = require('../middlewares/auth')
const {addAnswer} = require('../controllers/answer.controller')
 
/* GET users listing. */
router.use(verify)
router.post('/', addAnswer)

module.exports = router;
