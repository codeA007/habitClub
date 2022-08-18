const express = require('express');
const router = express.Router();
const habitControllers = require('../controllers/habitControllers');
const verifyToken = require('../controllers/verifyToken');

router.post('/add', verifyToken, habitControllers.addHabit);
router.post('/get', verifyToken, habitControllers.fetchHabits);
router.post('/complete', verifyToken, habitControllers.statusCompleted);
router.post('/delete', verifyToken, habitControllers.deleteHabit);
router.post('/getHabit', verifyToken, habitControllers.getHabit);
// router.post('/ranks', verifyToken, habitControllers);

module.exports = router;