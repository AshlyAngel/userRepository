var express = require('express');
var router = express.Router();



// importing middleware
const { validateField } = require('../middleware/fields/validators');
const verifyRequest = require('../middleware/fields/verifyRequest');
const { createUser, listUsers, detailedRead } = require('../modules/user/userController')
router.post('/create', validateField('user-create'), verifyRequest, createUser);
router.get('/readAll', listUsers);
router.post('/read', detailedRead);
module.exports = router;
