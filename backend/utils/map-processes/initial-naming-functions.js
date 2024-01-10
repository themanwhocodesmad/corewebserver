const generateInitialPlanetRandomName = () => {
    return "RandomName" + Math.floor(Math.random() * 1000)
}

module.exports = {generateInitialPlanetRandomName, }