const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Create a Driver
router.post('/', driverController.createDriver);

// Get all drivers
router.get('/', driverController.getAllDrivers);

// Get a single driver by ID
router.get('/:id', driverController.getDriverById);

router.put('/:id', driverController.updateDriver);

router.delete('/:id', driverController.deleteDriver);

module.exports = router;