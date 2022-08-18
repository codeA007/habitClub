const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/authControllers');
const verifyToken = require('../controllers/verifyToken');

router.post('/createUser', authControllers.createUser);
router.post('/loginUser', authControllers.loginUser);
router.post('/getUser', verifyToken, authControllers.getUser);
router.post('/ranks', verifyToken, authControllers.leaderBoard);

module.exports = router;