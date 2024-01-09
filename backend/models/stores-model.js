const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')
const { STORE_CAPACITY_MULTIPLIER } = require('../constants/stores-enum');


// Store Schema extending Building Schema
const storeSchema = new Schema({
    capacity: { type: Number, default: 1000 },
    active: { type: Boolean, default: true },
    storeType: {
        type: String,
        enum: ['Oxygen', 'Gas', 'Crystal'],
        required: true
    },
})

// Method to calculate capacity based on level
storeSchema.methods.calculateCapacity = function() {
    return 1000 + STORE_CAPACITY_MULTIPLIER * this.level;
};


const Store = Building.discriminator('Store', storeSchema)

module.exports = {
    Store
}