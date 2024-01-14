const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('../building-models/buildings-abstract-model')

// Trade Depot Schema extending Building Schema
const tradeDepotSchema = new Schema({
    activateTrade: { type: Boolean, default: false },
})

// Override the upgrade function
tradeDepotSchema.methods.upgrade = function() {
    Building.prototype.upgrade.call(this)
    if (this.level ==3)
        this.activateTrade = true
  }

// Adding Trade Depot as a discriminator of Building
const TradeDepot = Building.discriminator('Trade depot', tradeDepotSchema)

module.exports = TradeDepot
