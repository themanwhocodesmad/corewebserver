const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fleetSchema = new Schema({
    name: { type: String, required: true },
    troops: [{
        troopType: { type: Schema.Types.ObjectId, ref: 'Troop' },
        quantity: { type: Number, required: true }
    }],
    totalHp: { type: Number, default: 0 },
    stationedAt: {
        type: Schema.Types.ObjectId,
        ref: 'Planet',
    },
    distanceFromHome: {
        type: Number,
        default: 0 // Distance in kilometers
    },
    totalDefense: { type: Number, default: 0 },
    totalCargoCapacity: { type: Number, default: 0 },
    cargoOnBoard: {
        type: Map,
        of: Number,
        default: {}
    },
    status: {
        type: String,
        enum: ['stationed', 'inTransit', 'engaged'],
        default: 'stationed'
    }
}, { timestamps: true })

// Method to update cargo on board
fleetSchema.methods.updateCargoOnBoard = function(resourceType, amount) {
    const currentCargoTotal = this.calculateTotalCargo()
    const currentAmount = this.cargoOnBoard.get(resourceType) || 0

    if (currentCargoTotal + amount > this.totalCargoCapacity) {
        // Cap the amount so that total cargo doesn't exceed capacity
        const allowableAmount = this.totalCargoCapacity - currentCargoTotal
        this.cargoOnBoard.set(resourceType, currentAmount + allowableAmount)
    } else {
        this.cargoOnBoard.set(resourceType, currentAmount + amount)
    }
}

// Method to calculate total cargo on board
fleetSchema.methods.calculateTotalCargo = function() {
    let totalCargo = 0
    this.cargoOnBoard.forEach(amount => {
        totalCargo += amount
    })
    return totalCargo
}

const Fleet = mongoose.model('Fleet', fleetSchema)

module.exports = {Fleet,fleetSchema}
