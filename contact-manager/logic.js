const path = require('path')
const assert = require('assert')
const Datastore = require('nedb')

const db = new Datastore({
    filename: path.join(__dirname, 'data', `contact.db`)
})

db.loadDatabase()
db.persistence.setAutocompactionInterval(1000 * 60 * 1)

function toLower(v) {
    return v.toLowerCase()
}

const addContact = (nome, contact) => {
    db.insert({
        _id: nome,
        contact: contact
    }, (err) => {
        assert.equal(null, err)

        console.info('New contact added')
    })
}

const getContact = (name) => {
    const search = new RegExp(name, 'i')

    db.find({ contact: { $or: [{ firstname: search }, { lastname: search }] } })
    .exec((err, contact) => {
        assert.equal(null, err)
        
        console.info(contact)
        console.info(`${contact.length} matches`)
    })
}

module.exports = { addContact, getContact }