const express = require('express');
const { createCollaborator, getAllCollaborators, updateCollaborator, deleteCollaborator } = require('../controllers/collaboratorController');

const router = express.Router();

router.post('/', createCollaborator);
router.get('/', getAllCollaborators);
router.put('/:id', updateCollaborator);
router.delete('/:id', deleteCollaborator);

module.exports = router;

