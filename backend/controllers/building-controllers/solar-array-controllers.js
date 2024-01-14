const SolarArray = require('../../models/solar-array-model')
const { SOLAR_ARRAY_BASE_UPGRADE_DURATION, SolarArraysUpgradeCosts } = require('../../constants/solar-array-enum')

const createSolarArray = async (req, res) => {
    try {
        // Create a new Solar Array
        const newSolarArray = new SolarArray({
            name: "Solar Array", // A generic name for the solar array
            upgradeDurationBase: SOLAR_ARRAY_BASE_UPGRADE_DURATION,
            upgradeDuration: SOLAR_ARRAY_BASE_UPGRADE_DURATION,
            upgradeCosts: SolarArraysUpgradeCosts // Assuming this is an object, not an array
        });

        // Save the solar array
        await newSolarArray.save();

        res.status(201).send({ message: "Solar array created successfully", solarArray: newSolarArray });
    } catch (error) {
        res.status(500).send({ message: "Error creating solar array", error: error.message });
    }
}


// Controller function to get a single store
const getSolarArray = async (req, res) => {
    try {
        const { id } = req.params

        const solarArray = await SolarArray.findById(id)
        if (!solarArray) {
            return res.status(404).send({ message: "Solar array not found" })
        }

        res.status(200).json(solarArray);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving solar array", error: error.message })
    }
}

//Controller function to upgrade a solarArray (PUT)
const upgradeSolarArray = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'SolarArray not found' });
        }

        const solarArray = await SolarArray.findById(id);
        if (!solarArray) {
            return res.status(404).json({ msg: 'SolarArray not found' });
        }

        // Increment the level of the solarArray
        solarArray.level += 1;

        // Assuming calculateCapacity is a method in your SolarArray model
        // that recalculates storage based on the current level
        solarArray.storage = solarArray.calculateCapacity();

        await solarArray.save();
        res.status(200).json({ msg: 'SolarArray upgraded successfully', solarArray: solarArray });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createSolarArray,
    getSolarArray,
    upgradeSolarArray,
}
