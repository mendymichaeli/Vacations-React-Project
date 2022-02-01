const express = require('express');
const router = express.Router();
adminControllers = require('../controllers/adminControllers')

router.get('/getAllVacations', adminControllers.getAllVacations);
router.post('/createVacation', adminControllers.createVacation); 
router.get('/deleteVacation', adminControllers.deleteVacation); 
router.post('/updateVacation', adminControllers.updateVacation); 



module.exports = router;