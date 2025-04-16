const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const { authenticate, authorize } = require("../middleware/auth");

// Create service
router.post("/", authenticate, authorize(["superadmin", "manager"]), async (req, res) => {
  const { title, body, image, startingPrice } = req.body;
  const newService = new Service({ title, body, image, startingPrice });
  await newService.save();
  res.status(201).json(newService);
});

// Get all services (public)
router.get("/", async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

//Get single service by id
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Update service
router.put("/:id", authenticate, authorize(["superadmin", "manager"]), async (req, res) => {
  const { title, body, image, startingPrice } = req.body;
  const updated = await Service.findByIdAndUpdate(
    req.params.id,
    { title, image, body, startingPrice },
    { new: true }
  );
  res.json(updated);
});

// Delete service
router.delete("/:id", authenticate, authorize(["superadmin", "manager"]), async (req, res) => {
  /* await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" }); */

  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
