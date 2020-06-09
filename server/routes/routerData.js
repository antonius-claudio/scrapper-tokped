const router = require('express').Router();
const ControllerData = require('../controller/ControllerData');

router.get('/categories', ControllerData.getCategories);

router.get('/list', ControllerData.getList);

router.get('/item', ControllerData.getItem);

module.exports = router;