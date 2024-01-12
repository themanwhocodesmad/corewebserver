const BOMB_BUILDING_DAMAGE = 1

const TROOP_COSTS = {
    'Infantry_units': {
        'crystal': 100,
        'oxygen': 50,
        'Uranium': 300,
        'helium': 0,
    },
    'Assault_Tanks': {
        'crystal': 300,
        'oxygen': 200,
        'Uranium': 180,
        'helium': 0,
    },
    'Drone_Troopers': {
        'crystal': 240,
        'oxygen': 150,
        'Uranium': 210,
        'helium': 0,
    },
    'Sentinels': {
        'crystal': 180,
        'oxygen': 250,
        'Uranium': 200,
        'helium': 0,
    },
    'harvesters': {
        'crystal': 3000,
        'oxygen': 2100,
        'Uranium': 1800,
        'helium': 0,
    },
    'Bombers': {
        'crystal': 2000,
        'oxygen': 3500,
        'Uranium': 500,
        'helium': 0,
    },
    'Marauders': {
        'crystal': 2500,
        'oxygen': 1500,
        'Uranium': 700,
        'helium': 0,
    }
}


const TROOP_ChOICES = [
    ('Infantry', 'Infantry units'),
    ('AssaultTanks', 'Assault Tanks'),
    ('DroneTroopers', 'Drone Troopers'),
    ('Sentinels', 'Sentinels'),
    ('harvesters', 'harvesters'),
    ('Bombers', 'Bombers'),
    ('Marauders', 'Marauders'),
]


const TROOPS_DATA = {
    'Infantry_units': {
        'attackHp': 100,
        'defenseHp': 25,
        'speed': 9000,
        'cargoSpace': 120,
        'constructionTime': 160,  // seconds
        'helium3Tax': 1,
    },
    'Assault_Tanks': {
        'attackHp': 250,
        'defenseHp': 70,
        'speed': 11000,
        'cargoSpace': 50,
        'constructionTime': 300,  // seconds
        'helium3Tax': 1,
    },
    'Drone_Troopers': {
        'attackHp': 175,
        'defenseHp': 150,
        'speed': 15000,
        'cargoSpace': 180,
        'constructionTime': 385,  // seconds
        'helium3Tax': 1,
    },
    'Sentinels': {
        'attackHp': 80,
        'defenseHp': 150,
        'speed': 8000,
        'cargoSpace': 100,
        'constructionTime': 180,  // seconds
        'helium3Tax': 1,
    },
    'harvesters': {
        'attackHp': 25,
        'defenseHp': 20,
        'speed': 20000,
        'cargoSpace': 1000,
        'constructionTime': 120,  // seconds
        'helium3Tax': 1,
    },
    'Bombers': {
        'attackHp': 15,
        'defenseHp': 15,
        'speed': 10000,
        'cargoSpace': 1,
        'constructionTime': 500,  // seconds
        'helium3Tax': 1,
    },
    'Marauders': {
        'attackHp': 15,
        'defenseHp': 15,
        'speed': 17000,
        'cargoSpace': 450,  // Can only raid helium
        'constructionTime': 90,  // seconds
        'helium3Tax': 1,
    },
}

module.exports = {TROOPS_DATA, TROOP_COSTS, TROOP_ChOICES, BOMB_BUILDING_DAMAGE}