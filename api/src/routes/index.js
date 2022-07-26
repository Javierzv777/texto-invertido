const { Router } = require('express');
const {inverText} = require('./controllers/inverText.js');
const router = Router();

router.get("/iecho", inverText);

module.exports = router;