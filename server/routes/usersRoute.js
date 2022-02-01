const express = require('express');
const router = express.Router();
usersControllers = require('../controllers/usersControllers')

router.get('/getAllVacations', usersControllers.getAllVacations);
router.post('/createUsers', usersControllers.createUsers); 
router.post('/followingVacations', usersControllers.followingVacations); 
router.post('/UnfollowVacation', usersControllers.UnfollowVacation); 
router.post('/getUserForLogin', usersControllers.getUserForLogin); 
router.post('/checkFollow', usersControllers.checkFollow); 




module.exports = router;