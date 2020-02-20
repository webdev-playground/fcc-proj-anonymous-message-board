const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = Schema({
  threads: [{
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  }]
});

module.exports = mongoose.model('Board', boardSchema);
