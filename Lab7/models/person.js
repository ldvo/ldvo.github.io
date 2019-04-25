
const mongoose = require('mongoose');


const Person = mongoose.model('Person', {
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  born: {
    type: String,
    required: true,
  },
  timeline: {
    type: String,
    required: true,
  },
  allegiance: {
    type: [String],
    required: false,
  },
  playedBy: {
    type: String,
    required: true,
  },
  titles: {
    type: [String],
    required: false,
  },
  father: {
    type: String,
    required: false,
  },
  mother: {
    type: String,
    required: false,
  },
  spouse: {
    type: String,
    required: false,
  },
});

module.exports = Person;

