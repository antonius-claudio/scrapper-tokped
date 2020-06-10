const router = require('express').Router();
const ControllerData = require('../controller/ControllerData');

router.get('/categories', ControllerData.getCategories);

router.get('/list', ControllerData.getList);

router.get('/itembylist', ControllerData.getItemByList);

router.get('/item', ControllerData.getItem);

router.get('/test', ControllerData.gettest);

module.exports = router;