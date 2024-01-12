const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')
const { STORE_CAPACITY_MULTIPLIER } = require('../constants/stores-enum')


// Store Schema extending Building Schema
const storeSchema = new Schema({
    storage: { type: Number, default: 10000 },
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
    this.storage += STORE_CAPACITY_MULTIPLIER
  }

const Store = Building.discriminator('Store', storeSchema)

module.exports = {
    Store
}