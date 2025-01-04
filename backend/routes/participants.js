const express = require('express');
const multer = require('multer');
const path = require('path');
const { createParticipant, getAllParticipants, updateParticipant, deleteParticipant } = require('../controllers/participantController');

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

router.post('/', upload.single('photo'), createParticipant);
router.get('/', getAllParticipants);
router.put('/:id', updateParticipant);
router.delete('/:id', deleteParticipant);

module.exports = router;

