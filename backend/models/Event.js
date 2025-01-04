const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  place: String,
  specialGuest: String,
  description: String,
  price: Number,
  image: String,
  totalTickets: Number,
  availableTickets: Number,
});

module.exports = mongoose.model('Event', eventSchema);

