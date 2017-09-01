const path = require('path')
const Datastore = require('nedb')
const moment = require('moment')

const db = new Datastore({
  filename: path.join(__dirname, '..', 'data', `cinema.db`)
})

db.loadDatabase()
db.persistence.setAutocompactionInterval(1000 * 60 * 1)

function get(indice, callback) {
  db.findOne({
    _id: indice
  }, callback)
}

function add(indice, filme, callback) {
  db.insert({
    _id: indice,
    dados: filme,
    data: moment().format('HH:mm:ss YYYY/MM/DD')
  }, (err, filme) => {
    callback(err, filme)
  })
}

function remove(cb) {
  db.remove({}, {
    multi: true
  }, (err, numRemoved) => {
    if (err) cb(err)

    cb(null, numRemoved)
  })
}

module.exports = {
  get,
  add,
  remove
}