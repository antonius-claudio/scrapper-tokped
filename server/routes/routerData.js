const router = require('express').Router();
const ControllerData = require('../controller/ControllerData');

router.get('/', ControllerData.getItems);

module.exports = router;