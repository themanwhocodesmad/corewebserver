const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('../building-models/buildings-abstract-model')
const { MINES_PRODUCTION_RATE } = require('../../../constants/mines-enum')

// Mine Schema extending Building Schema
const mineSchema = new Schema({
    productionRate: { type: Number, default: 0 },
    mineType: {
        type: String,
        enum: ['Metal', 'Gas', 'Crystal'],
        required: true
    },
})

mineSchema.methods.upgrade = function() {
    Building.prototype.upgrade.call(this);
    this.productionRate += MINES_PRODUCTION_RATE;
  }

// Adding Mine as a discriminator of Building
const Mine = Building.discriminator('Mine', mineSchema)

module.exports = {
    Mine
}
