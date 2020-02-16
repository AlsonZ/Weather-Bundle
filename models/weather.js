const mongoose = require('mongoose')

const weatherSchema = new mongoose.Schema({
  site: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  data: [{
    day: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    minTemp: {
      type: String,
      required: true
    },
    maxTemp: {
      type: String,
      required: true
    },
    rainChance: {
      type: String,
      required: true
    },
    rainAmount: {
      type: String,
      required: true
    },
    fireDanger: {
      type: String,
      required: true
    },
    UVIndex: {
      type: String,
      required: true
    },
  }]


})
module.exports = mongoose.model('weatherdata', weatherSchema)