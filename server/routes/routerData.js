const router = require('express').Router();
const ControllerData = require('../controller/ControllerData');

router.get('/categories', ControllerData.getCategories);

router.get('/list', ControllerData.getList);

router.post('/itembylist', ControllerData.getItemByList);

router.post('/itembyStore', ControllerData.getItemByStore);

router.get('/item', ControllerData.getItem);

router.get('/test', ControllerData.gettest);

router.post('/shopeeEtalase', ControllerData.getEtalaseShopee);

module.exports = router;