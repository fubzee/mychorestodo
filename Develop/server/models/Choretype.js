const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChoretypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String
  }
});

const Choretype = mongoose.model('Choretype', ChoretypeSchema);

module.exports = Choretype;
