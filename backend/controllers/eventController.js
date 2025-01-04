const Event = require('../models/Event');

function isDateInFuture(date) {
  return new Date(date) > new Date();
}

function isAtLeastTwoDaysBefore(eventDate) {
  const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;
  return new Date(eventDate) - Date.now() > twoDaysInMilliseconds;
}

exports.createEvent = async (req, res) => {
  const eventData = {
    ...req.body,
    image: req.file ? `/uploads/${req.file.filename}` : null,
    availableTickets: req.body.totalTickets,
  };

  if (!isDateInFuture(eventData.date)) {
    return res.status(400).json({ message: 'Event date must be in the future' });
  }

  const event = new Event(eventData);
  try {
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!isAtLeastTwoDaysBefore(event.date)) {
      return res.status(400).json({ message: 'Event can only be updated at least 2 days before its date' });
    }

    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }
    if (updatedData.totalTickets) {
      const ticketsDifference = updatedData.totalTickets - event.totalTickets;
      updatedData.availableTickets = event.availableTickets + ticketsDifference;
    }
    if (updatedData.date && !isDateInFuture(updatedData.date)) {
      return res.status(400).json({ message: 'Updated event date must be in the future' });
    }
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

