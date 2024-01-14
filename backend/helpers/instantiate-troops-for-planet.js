const Troop = require('../models/game-models/armoury-models/troops-abstract-model');
const Bombers = require('../models/game-models/armoury-models/bomber-model'); 
const { TROOPS_DATA, TROOP_COSTS, BOMB_BUILDING_DAMAGE } = require('../constants/troop-constants/troops-enum');

const createTroop = async (troopType, armouryId) => {
    let newTroop;
    const troopData = TROOPS_DATA[troopType] || {};
    const troopCosts = TROOP_COSTS[troopType] || {};

    if (troopType === 'Bombers') {
        newTroop = new Bombers({
            ...troopData,
            buildingDamage: BOMB_BUILDING_DAMAGE,
            costs: troopCosts,
            armoury: armouryId,
        });
    } else {
        newTroop = new Troop({
            ...troopData,
            type: troopType, // Set the type manually for general troops
            costs: troopCosts,
            armoury: armouryId,
        });
    }
    await newTroop.save();
    return newTroop;
}

async function updateTroopNamesInArmoury(armouryId) {
    try {
        const armoury = await Armoury.findById(armouryId).populate('troops.troopType');
        if (!armoury) {
            console.log('Armoury not found');
            return;
        }

        for (let i = 0; i < armoury.troops.length; i++) {
            const troopEntry = armoury.troops[i];
            if (troopEntry.troopType && troopEntry.troopType.name) {
                // Update the troop name in the armoury
                troopEntry.troopName = troopEntry.troopType.name;
            }
        }

        await armoury.save();
        console.log('Armoury troop names updated successfully');
    } catch (error) {
        console.error('Error updating troop names in armoury:', error);
    }
}


module.exports = {createTroop,updateTroopNamesInArmoury}
