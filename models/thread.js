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
    default: Date.now
  },
  reported: {
    type: Boolean,
    default: false
  }
});

const threadSchema = Schema({
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
    default: Date.now
  },
  bumped_on: {
    type: Date,
    default: Date.now
  },
  reported: {
    type: Boolean,
    default: false
  },
  replies: [replySchema]
});

exports = module.exports = mongoose.model('Thread', threadSchema);

exports.setBoard = function(boardName) {
  return mongoose.model('Thread', threadSchema, boardName);
}
