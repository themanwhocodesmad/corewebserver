const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('../building-models/buildings-abstract-model')

// R&D Schema extending Building Schema
const researchAndDevelopmentSchema = new Schema({
    impulseBoostLevel: { type: Number, default: 0, min: 0, max: 20 },
    constructionBoostLevel: { type: Number, default: 0, min: 0, max: 20 },
    alienTechnologyLevel: { type: Number, default: 0, min: 0, max: 10 }
})

// Adding R&D as a discriminator of Building
const ResearchAndDevelopment = Building.discriminator('ResearchAndDevelopment', researchAndDevelopmentSchema)

module.exports = ResearchAndDevelopment
