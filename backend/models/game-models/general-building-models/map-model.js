const mongoose = require('mongoose')
const Planet = require('../building-models/planets-model')


const Schema = mongoose.Schema;
const { MapStatusEnum } = require('../../../../../constants/map-enum');

const mapSchema = new Schema({
    galaxy: { type: Number, required: true },
    planetId: { type: Schema.Types.ObjectId, ref: 'Planet', default: null },
    planetNumber: { type: Number, required: true },
    coordinates: { type: String, unique: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    
    status: { type: String, enum: Object.values(MapStatusEnum), default: MapStatusEnum.AVAILABLE }
});

// Post-save hook to set planetId as the Map document's _id initially
mapSchema.post('save', function(doc, next) {
    doc.planetId = doc._id;
    doc.save().then(() => next()).catch(err => next(err));
});

mapSchema.methods.generateCoordinates = function() {
    this.coordinates = `G${String(this.galaxy).padStart(2, '0')}P${String(this.planetNumber).padStart(2, '0')}`;
}

module.exports = mongoose.model('Map', mapSchema);
