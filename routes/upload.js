// routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    
    // optionally remove file from local server
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      imageUrl: result.secure_url,
      public_id: result.public_id
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
