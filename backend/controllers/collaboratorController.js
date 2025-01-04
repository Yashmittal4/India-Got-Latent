const Collaborator = require('../models/Collaborator');

exports.createCollaborator = async (req, res) => {
  const collaborator = new Collaborator(req.body);
  try {
    await collaborator.save();
    res.status(201).json(collaborator);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllCollaborators = async (req, res) => {
  try {
    const collaborators = await Collaborator.find();
    res.json(collaborators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCollaborator = async (req, res) => {
  try {
    const collaborator = await Collaborator.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(collaborator);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCollaborator = async (req, res) => {
  try {
    await Collaborator.findByIdAndDelete(req.params.id);
    res.json({ message: 'Collaborator deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

