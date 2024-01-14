const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Abstract Troop Schema
const troopSchema = new Schema({
    name: { type: String, required: true },
    attackHp: { type: Number, required: true },
    defenseHp: { type: Number, required: true },
    speed: { type: Number, required: true },
    cargoSpace: { type: Number, required: true },
    constructionTime: { type: Number, required: true }, // in seconds
    helium3Tax: { type: Number, required: true },
    armoury: { 
        type: Schema.Types.ObjectId, 
        ref: 'Armoury', 
        required: true 
    },
    costs: {
        crystal: { type: Number, default: 0 },
        metal: { type: Number, default: 0 },
        gas: { type: Number, default: 0 },
    },
}, { discriminatorKey: 'type', collection: 'troops' })

// Create a base model
const Troop = mongoose.model('Troop', troopSchema)

module.exports = Troop
