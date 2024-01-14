const { Store } = require('../../models/stores-model')
const mongoose = require('mongoose')
const { MineTypes } = require('../../constants/mines-enum')
const {StoresUpgradeCosts, STORE_BASE_UPGRADE_DURATION} = require('../../constants/stores-enum')

// Controller function to CREATE all stores (POST)
const createAllStores = async (req, res) => {
    try {
         // Iterate over each type in the mineType enum
        const storePromises = Object.values(MineTypes).map(type => {
            const newStore = new Store({
                storeType: type,
                name: `${type} store`,

                //! ALWAYS INITIATE THESE VALUES
                upgradeDurationBase: STORE_BASE_UPGRADE_DURATION,
                upgradeDuration: STORE_BASE_UPGRADE_DURATION,
                upgradeCosts: StoresUpgradeCosts[type]
            })

            return newStore.save()
        })

        // Wait for all stores to get created
        await Promise.all(storePromises)

        res.status(201).send({ message: "All stores created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Error creating stores", error: error.message })
    }
}

// Controller function to upgrade a store (PUT)
const upgradeStore = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'Store not found' })
        }

        const store = await Store.findById(id)
        if (!store) {
            return res.status(404).json({ msg: 'Store not found' })
        }

        //!TODO Add a function that will process upgrades below is just example
        //Increment the level of the store and recalculate storage
        store.level += 1
        store.storage = store.calculateCapacity() 

        await store.save()
        res.status(200).json({ msg: 'Store upgraded successfully', store: store })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Controller function to get all stores
const getAllStores = async (req, res) => {
    try {
        const stores = await Store.find({})
        if (!stores || stores.length === 0) {
            return res.status(404).json({ msg: 'No stores found' })
        }

        res.status(200).json(stores)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Controller function to get a single store
const getStore = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid store ID' })
        }

        const store = await Store.findById(id)
        if (!store) {
            return res.status(404).json({ msg: 'Store not found' })
        }

        res.status(200).json(store)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createAllStores,
    upgradeStore,
    getAllStores,
    getStore,
}
