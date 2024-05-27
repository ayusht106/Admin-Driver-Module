const Driver = require('../Model/Driver');

const allowedVehicles = ['Truck', 'Car', 'Pickup Truck', 'Motorcycle'];

const createDriver = async (req, res) => {
  try {
    const { name, phone, email, tempPassword, notes, vehicle, status } = req.body;

    if (vehicle && !allowedVehicles.includes(vehicle)) {
      return res.status(400).json({ error: 'Invalid vehicle type' });
    }

    const newDriver = new Driver({ name, phone, email, tempPassword, notes, vehicle, status });
    const savedDriver = await newDriver.save();

    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDriver = async (req, res) => {
  try {
    const { vehicle } = req.body;
    if (vehicle && !allowedVehicles.includes(vehicle)) {
      return res.status(400).json({ error: 'Invalid vehicle type' });
    }

    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDriver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.json(updatedDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDriver = async (req, res) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
    if (!deletedDriver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.json(deletedDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};
