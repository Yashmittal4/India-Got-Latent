const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  name: String,
  email: String,
  phoneNumber: String,
  numberOfTickets: Number,
  totalPrice: Number,
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Booking', bookingSchema);

