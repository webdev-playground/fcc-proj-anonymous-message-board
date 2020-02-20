const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  threads: [{
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  }]
});

module.exports = mongoose.model('Board', boardSchema);
