const router = require('express').Router();
const routerData = require('./routerData');

router.use('/', routerData);

module.exports = router;