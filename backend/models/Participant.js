const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  sex: String,
  email: String,
  instaId: String,
  photo: String,
  talentCategory: String,
  otherTalent: String,
  crazyThing: String,
  embarrassingMoment: String,
  lifeTrauma: String,
  watchedPreviousEpisodes: Boolean,
  whyAttending: String,
  personalityScore: Number,
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Participant', participantSchema);

