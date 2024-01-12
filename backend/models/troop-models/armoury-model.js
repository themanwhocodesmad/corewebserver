const mongoose = require('mongoose')
const fleetSchema = require('./fleet-schema')
const Schema = mongoose.Schema

const armourySchema = new Schema({
    planet: {
        type: Schema.Types.ObjectId,
        ref: 'Planet',
        required: true
    },
    fleets: [fleetSchema],
})

const Armoury = mongoose.model('Armoury', armourySchema)

module.exports = Armoury
