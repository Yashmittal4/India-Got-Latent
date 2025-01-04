const Participant = require('../models/Participant');

exports.createParticipant = async (req, res) => {
  const participant = new Participant({
    ...req.body,
    photo: req.file ? `/uploads/${req.file.filename}` : null,
  });
  try {
    await participant.save();
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(participant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteParticipant = async (req, res) => {
  try {
    await Participant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Participant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

