const mongoose = require('mongoose')
const { generateInitialPlanetRandomName } = require('../../../helpers/initial-naming-functions')
const Schema = mongoose.Schema

/*
Main model to define what is a planet, the buildingSchema will have to reference this model.
Players can have multiple planets. Also creates the planet's name and coordinates
*/

const planetSchema = new Schema({
    galaxy: { type: Number, default: 1, min: 1 },
    planetNumber: { type: Number, default: 1, min: 1 },
    population: { type: Number, default: 0 },
    coordinates: {type: String, unique: true},
    name: { type: String, default: generateInitialPlanetRandomName() }, // TODO function to generate random name
    occupied: {type:Boolean, default:false}
    // owner: { type: Schema.Types.ObjectId, ref: 'User' } // TODO tie this model to a user
}, { timestamps: true })

// Ensure unique combination of galaxy and planetNumber
planetSchema.index({ galaxy: 1, planetNumber: 1 }, { unique: true })

// Generate coordinates
planetSchema.methods.generateCoordinates = function() {
    this.coordinates = `G${String(this.galaxy).padStart(2, '0')}P${String(this.planetNumber).padStart(2, '0')}`
}

// Calculate coordinates
planetSchema.methods.calculateTotalPopulation = async function() {
    try {
        const buildings = await Building.find({ planet: this._id });
        let totalPopulation = 0;

        buildings.forEach(building => {
            totalPopulation += building.population || 0;
        });

        this.planetPopulation = totalPopulation;
        await this.save(); // Save the planet with the updated population
    } catch (error) {
        console.error('Error calculating total population:', error);
        throw error;
    }
};

const Planet = mongoose.model('Planet', planetSchema)

module.exports = Planet