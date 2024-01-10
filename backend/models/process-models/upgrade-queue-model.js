// TODO WORK IN PROGRESS DO NOT JUDGE 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const upgradeQueueSchema = new Schema({
    planetId: { type: Schema.Types.ObjectId, ref: 'Planet', required: true },
    buildingId: { type: Schema.Types.ObjectId, required: true },
    taskId: { type: String, required: true }, // Agenda job ID
    upgradeStartTime: { type: Date, default: Date.now },
    upgradeEndTime: { type: Date, required: true }, // When the upgrade is expected to complete
    // Add any other fields you might need
});

module.exports = mongoose.model('UpgradeQueue', upgradeQueueSchema);
