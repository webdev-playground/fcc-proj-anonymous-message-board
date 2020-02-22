const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  threads: [threadSchema]
});

module.exports = mongoose.model('Board', boardSchema);
