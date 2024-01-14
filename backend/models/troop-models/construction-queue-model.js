const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const constructionQueueSchema = new Schema({
    name: { type: String},
    armoury: { type: Schema.Types.ObjectId, ref: 'Armoury', required: true },
    troopType: { type: Schema.Types.ObjectId, ref: 'Troop', required: true },
    quantity: { type: Number, required: true, default: 0 },
    constructionTime: { type: Number, required: true },
    startTime: { type: Date }
});

// Virtual for totalConstructionTime
constructionQueueSchema.virtual('totalConstructionTime').get(function() {
    return this.remainingConstructionTime * this.quantity;
});

// Post-save middleware
constructionQueueSchema.post('save', function(doc, next) {
    // Your post-save logic here
    console.log(`Construction job for ${doc.quantity} units saved.`);
    // Continue the middleware chain
    next();
});

const ConstructionQueue = mongoose.model('ConstructionQueue', constructionQueueSchema);

module.exports = ConstructionQueue;
