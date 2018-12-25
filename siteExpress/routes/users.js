/**
 * Все маршруты уже содержат "/users/", поэтому для "/users/list" прописываем только "/list".
 * @todo: разобраться с этим поведением. Понять можно ли создавать свои маршруты.
 * @type {createApplication}
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
    res.send('@TODO: users list');
});

router.post('/add', function(req, res, next) {
    res.send('@TODO: Users add');
});


module.exports = router;
