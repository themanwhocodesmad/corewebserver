const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')

// Mine Schema extending Building Schema
const tradeDepotSchema = new Schema({
    activateTrade: { type: Boolean, default: false },
})

// Adding Mine as a discriminator of Building
const TradeDepot = Building.discriminator('Trade depot', tradeDepotSchema)

module.exports = TradeDepot
