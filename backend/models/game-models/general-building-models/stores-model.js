const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('../building-models/buildings-abstract-model')
const { STORE_CAPACITY_MULTIPLIER, INITIAL_STORAGE_CAPACITY } = require('../../../constants/stores-enum')


// Store Schema extending Building Schema
const storeSchema = new Schema({
    storage: { type: Number, default: INITIAL_STORAGE_CAPACITY },
    capacity: { type: Number, default: INITIAL_STORAGE_CAPACITY },
    active: { type: Boolean, default: true },
    storeType: {
        type: String,
        enum: ['Metal', 'Gas', 'Crystal'],
        required: true
    },
})

// Override the upgrade function
storeSchema.methods.upgrade = function() {
    Building.prototype.upgrade.call(this)
    this.capacity += STORE_CAPACITY_MULTIPLIER
  }

const Store = Building.discriminator('Store', storeSchema)

module.exports = {
    Store
}