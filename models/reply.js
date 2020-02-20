const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = Schema({
  text: {
    type: String,
    required: true
  },
  delete_password: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now()
  },
  reported: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Reply', replySchema);
