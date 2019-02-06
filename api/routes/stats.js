const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Stat = require('../models/stat')
const timestamp = require('unix-timestamp', {
  round: true
})

router.get('/:index', (req, res, next) => {
  Stat.find({ index: req.params.index })
    .select('_id index macAddress description octetsIn octetsOut difference previousDifference rateChange timestamp')
    .exec()
    .then(docs => {
      const response = {
        stat: docs.map(doc => {
          return {
            _id: doc.id,
            index: doc.index,
            macAddress: doc.macAddress,
            description: doc.description,
            octetsIn: doc.octetsIn,
            octetsOut: doc.octetsOut,
            difference: doc.difference,
            previousDifference: doc.previousDifference,
            rateChange: doc.rateChange,
            timestamp: Math.round(timestamp.now())
          }
        })
      }
      console.log(docs)
      res.render('stats', {
        stats: docs,
        index: req.params.index,
        macAddress: docs[0].macAddress,
        description: docs[0].description
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.post('/', (req, res, next) => {
  // receive statistics from manager and save to db
  const stat = new Stat({
    _id: new mongoose.Types.ObjectId(),
    index: req.body.index,
    macAddress: req.body.macAddress,
    description: req.body.description,
    octetsIn: req.body.octetsIn,
    octetsOut: req.body.octetsOut,
    difference: req.body.difference,
    previousDifference: req.body.previousDifference,
    rateChange: req.body.rateChange,
    timestamp: Math.round(timestamp.now())
  })

  stat
    .save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Created stat successfully',
        stat: {
          _id: result.id,
          index: result.index,
          macAddress: result.macAddress,
          description: result.description,
          octetsIn: result.octetsIn,
          octetsOut: result.octetsOut,
          difference: result.difference,
          previousDifference: result.previousDifference,
          rateChange: result.rateChange,
          timestamp: result.timestamp
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err,
        message: 'could not add stat'
      })
    })
})

router.get('/api', (req, res, next) => {
  Stat.find()
    .select('_id index macAddress description octetsIn octetsOut difference previousDifference rateChange timestamp')
    .exec()
    .then(docs => {
      docs.map(doc => {
        return {
          _id: doc.id,
          index: doc.index,
          macAddress: doc.macAddress,
          description: doc.description,
          octetsIn: doc.octetsIn,
          octetsOut: doc.octetsOut,
          difference: doc.difference,
          previousDifference: doc.previousDifference,
          rateChange: doc.rateChange,
          timestamp: doc.timestamp
        }
      })

      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.get('/api/:index', (req, res, next) => {
  Stat.find({
    index: req.params.index
  })
    .select('_id index macAddress description octetsIn octetsOut difference previousDifference rateChange timestamp')
    .exec()
    .then(docs => {
      docs.map(doc => {
        return {
          _id: doc.id,
          index: doc.index,
          macAddress: doc.macAddress,
          description: doc.description,
          octetsIn: doc.octetsIn,
          octetsOut: doc.octetsOut,
          difference: doc.difference,
          previousDifference: doc.previousDifference,
          rateChange: doc.rateChange,
          timestamp: doc.timestamp
        }
      })

      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

exports.routes = router
