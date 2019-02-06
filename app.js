const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')

const statsRoutes = require('./api/routes/stats')

mongoose.connect('mongodb+srv://gilgm:' + process.env.MONGO_ATLAS_PW + '@gr-octet-l4gos.mongodb.net/', {
  useNewUrlParser: true,
  dbName: 'octetstats'
})
  .then(res => { console.log('Connected to database') })
  .catch(err => { console.log('error connecting -> ' + err) })

mongoose.Promise = global.Promise
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/stats', statsRoutes.routes)

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
