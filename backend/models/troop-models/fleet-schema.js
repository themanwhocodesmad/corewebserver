const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fleetSchema = new Schema({
    name: { type: String, required: true },
    troops: [{
        troopType: { type: Schema.Types.ObjectId, ref: 'Troop' },
        quantity: { type: Number, required: true }
    }],
    totalHp: { type: Number, default: 0 },
    totalDefense: { type: Number, default: 0 },
    totalCargoCapacity: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['stationed', 'inTransit', 'engaged'],
        default: 'stationed'
    }
}, { timestamps: true })

module.exports = fleetSchema
