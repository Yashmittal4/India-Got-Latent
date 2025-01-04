const mongoose = require('mongoose');

const collaboratorSchema = new mongoose.Schema({
  role: String,
  name: String,
  phoneNumber: String,
  email: String,
  instaId: String,
  aboutYourself: String,
  viewedPreviousEpisodes: Boolean,
  brandName: String,
  priceOffering: String,
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Collaborator', collaboratorSchema);

