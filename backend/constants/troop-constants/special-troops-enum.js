
const SPECIAL_TROOP_COSTS = {
    'Gaea Guardians': {
        'Boron': 15000,
        'Metal': 5000,
        'Uranium': 20000,
        'Helium': 100,
    },
    'Phoenix Sentinels': {
        'Boron': 10000,
        'Metal': 8000,
        'Uranium': 18000,
        'Helium': 50,
    },
    'Stormbringer Ravagers': {
        'Boron': 12000,
        'Metal': 10000,
        'Uranium': 15000,
        'Helium': 150,
    },
}

const SPECIAL_TROOPS_DATA = {
    'Gaea Guardians': {
        'attackHp': 500,
        'defenseHp': 500,
        'speed': 10000,
        'cargoSpace': 250,
        'constructionTime': 1000,  // seconds
        'helium3Tax': 2,
    },
    'Phoenix Sentinels': {
        'attackHp': 400,
        'defenseHp': 500,
        'speed': 12000,
        'cargoSpace': 100,
        'constructionTime': 800,  // seconds
        'helium3Tax': 2,
    },
    'Stormbringer Ravagers': {
        'attackHp': 500,
        'defenseHp': 400,
        'speed': 15000,
        'cargoSpace': 250,
        'constructionTime': 1200,  // seconds
        'helium3Tax': 2,
    },
}

module.exports = {SPECIAL_TROOPS_DATA, SPECIAL_TROOP_COSTS}