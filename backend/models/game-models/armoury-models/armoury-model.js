const mongoose = require('mongoose')
const fleetSchema = require('./fleet-schema').fleetSchema
const Schema = mongoose.Schema

const armourySchema = new Schema({
    planet: {
        type: Schema.Types.ObjectId,
        ref: 'Planet',
        required: true
    },
    fleets: [fleetSchema],
    troops: [{
        troopType: { type: Schema.Types.ObjectId, ref: 'Troop' },
        troopName: { type: String }, // Added field for troop name
        quantity: { type: Number, required: true, default: 0 }
    }],
});

const Armoury = mongoose.model('Armoury', armourySchema);

module.exports = Armoury;

