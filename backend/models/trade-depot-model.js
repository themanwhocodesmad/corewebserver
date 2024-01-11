const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')

// Trade Depot Schema extending Building Schema
const tradeDepotSchema = new Schema({
    activateTrade: { type: Boolean, default: false },
})

// Adding Trade Depot as a discriminator of Building
const TradeDepot = Building.discriminator('Trade depot', tradeDepotSchema)

module.exports = TradeDepot
