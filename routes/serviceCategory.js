const express = require('express');
const router = express.Router();
const ServiceCategory = require('../models/ServiceCategory');
const { authenticate, authorize } = require('../middleware/auth');

// Create
router.post('/', authenticate, authorize(["superadmin", "manager"]), async (req, res) => {
  const { name } = req.body;
  try {
    const category = await ServiceCategory.create({ name });
    res.status(201).json({ message: 'Category created', data: category });
  } catch (err) {
    res.status(500).json({ message: 'Error creating category' });
  }
});

// Read all
router.get('/', async (req, res) => {
  const categories = await ServiceCategory.find();
  res.json({ message: 'Categories fetched', data: categories });
});

// Read single
router.get('/:id', async (req, res) => {
  const category = await ServiceCategory.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json({ message: 'Category fetched', data: category });
});

// Update
router.put('/:id', authenticate, authorize(["superadmin", "manager"]), async (req, res) => {
  const category = await ServiceCategory.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.json({ message: 'Category updated', data: category });
});

// Delete
router.delete('/:id', authenticate, authorize(["superadmin", "manager"]), async (req, res) => {
  await ServiceCategory.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category deleted' });
});

module.exports = router;
