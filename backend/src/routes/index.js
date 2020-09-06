/** Contain api routes of the application */

const { Router } = require('express');
const router = Router();

const { getUsers, createUser} = require('../controllers/index.controller');

router.get('/users', getUsers);
router.post('/users', createUser);

module.exports = router;    