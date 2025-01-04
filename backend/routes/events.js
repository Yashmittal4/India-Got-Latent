const express = require('express');
const multer = require('multer');
const path = require('path');
const { createEvent, getAllEvents, updateEvent, deleteEvent } = require('../controllers/eventController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), createEvent);
router.get('/', getAllEvents);
router.put('/:id', upload.single('image'), updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;

