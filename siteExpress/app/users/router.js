/**
 * Все маршруты уже содержат "/users/", поэтому для "/users/list" прописываем только "/list".
 * @todo: разобраться с этим поведением. Понять можно ли создавать свои маршруты.
 * @type {createApplication}
 */
var router = require('express').Router();
var controller = require('./Controller');

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/list', controller.list);
router.get('/item', controller.item);

router.get('/add', controller.add);
router.post('/add', controller.add);

router.get('/edit', controller.edit);
router.post('/edit', controller.edit);


router.get('/remove', controller.remove);
router.post('/remove', controller.remove);

module.exports = router;
