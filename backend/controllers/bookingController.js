const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.createBooking = async (req, res) => {
  try {
    const { eventId, name, email, phoneNumber, numberOfTickets } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.availableTickets < numberOfTickets) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }
    const totalPrice = event.price * numberOfTickets;
    const booking = new Booking({
      eventId,
      name,
      email,
      phoneNumber,
      numberOfTickets,
      totalPrice,
    });
    await booking.save();
    event.availableTickets -= numberOfTickets;
    await event.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('eventId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

