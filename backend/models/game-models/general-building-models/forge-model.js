const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('../building-models/buildings-abstract-model')

// Forge Schema extending Building Schema
const forgeSchema = new Schema({
    constructionBoost: { type: Number, default: 0 },
    researchLab: { 
        type: Schema.Types.ObjectId, 
        ref: 'ResearchAndDevelopment'
    },
})


// Adding Forge as a discriminator of Building
const Forge = Building.discriminator('Forge', forgeSchema)

module.exports = Forge
