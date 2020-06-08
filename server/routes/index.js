const router = require('express').Router();
const routerData = require('./routerData');

router.use('/items', routerData);

module.exports = router;