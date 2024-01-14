const Troop = require("../models/game-models/armoury-models/troops-abstract-model");



async function checkAndDeductResourcesForTroops(stores, troopType, quantityToAdd) {
    let sufficientResources = true;
''
    // Fetch troop costs
    const troop = await Troop.findById(troopType);
    if (!troop) {
        console.error('Troop not found');
        return false;
    }

    const totalCosts = Object.keys(troop.costs).reduce((acc, key) => {
        acc[key] = troop.costs[key] * quantityToAdd;

        return acc;
    }, {});

    // Map store types to their corresponding troop cost key
    const storeTypeToCostKey = {
        'Gas': 'gas',
        'Crystal': 'crystal',
        'Metal': 'metal'
    };

    const saveOperations = stores.map(async (store) => {
        const costKey = storeTypeToCostKey[store.storeType];
        if (costKey && store.storage >= totalCosts[costKey]) {
            // Deducting the cost from the store's storage
            store.storage -= totalCosts[costKey];
            try {
                await store.save();
            } catch (error) {
                sufficientResources = false;
                console.error('Failed to save ${store.storeType} store:', error);
            }
        }

        else {
            sufficientResources = false; console.log('Insufficient resources in store to deduct costs.', store.storeType);
        }
    });
    await Promise.all(saveOperations);

    return sufficientResources;
}

module.exports = checkAndDeductResourcesForTroops
