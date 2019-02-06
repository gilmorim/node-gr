const mongoose = require('mongoose')

const statSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  index: String,
  macAddress: String,
  description: String,
  octetsIn: Number,
  octetsOut: Number,
  difference: Number,
  previousDifference: Number,
  rateChange: Number,
  timestamp: String
})

module.exports = mongoose.model('Stat', statSchema)
