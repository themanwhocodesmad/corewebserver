const BOMB_BUILDING_DAMAGE = 1

const TROOP_COSTS = {
    'Infantry_Troops': {
        'crystal': 100,
        'metal': 50,
        'gas': 300,
        'helium': 0,
    },
    'Assault_Tanks': {
        'crystal': 300,
        'metal': 200,
        'gas': 180,
        'helium': 0,
    },
    'Drone_Troopers': {
        'crystal': 240,
        'metal': 150,
        'gas': 210,
        'helium': 0,
    },
    'Sentinels': {
        'crystal': 180,
        'metal': 250,
        'gas': 200,
        'helium': 0,
    },
    'Harvesters': {
        'crystal': 3000,
        'metal': 2100,
        'gas': 1800,
        'helium': 0,
    },
    'Bombers': {
        'crystal': 2000,
        'metal': 3500,
        'gas': 500,
        'helium': 0,
    },
    'Marauders': {
        'crystal': 2500,
        'metal': 1500,
        'gas': 700,
        'helium': 0,
    }
}


const TROOP_CHOICES = [
    ('Infantry', 'Infantry units'),
    ('AssaultTanks', 'Assault Tanks'),
    ('DroneTroopers', 'Drone Troopers'),
    ('Sentinels', 'Sentinels'),
    ('harvesters', 'harvesters'),
    ('Bombers', 'Bombers'),
    ('Marauders', 'Marauders'),
]


const TROOPS_DATA = {
    'Infantry_Troops': {
        'name': 'Infantry troops',
        'attackHp': 100,
        'defenseHp': 25,
        'speed': 9000,
        'cargoSpace': 120,
        'constructionTime': 160,  // seconds
        'helium3Tax': 1,
    },
    'Assault_Tanks': {
        'name': 'Assault tanks',
        'attackHp': 250,
        'defenseHp': 70,
        'speed': 11000,
        'cargoSpace': 50,
        'constructionTime': 300,  // seconds
        'helium3Tax': 1,
    },
    'Drone_Troopers': {
        'name': 'Drone troopers', 
        'attackHp': 175,
        'defenseHp': 150,
        'speed': 15000,
        'cargoSpace': 180,
        'constructionTime': 385,  // seconds
        'helium3Tax': 1,
    },
    'Sentinels': {
        'name': 'Sentinels', 
        'attackHp': 80,
        'defenseHp': 150,
        'speed': 8000,
        'cargoSpace': 100,
        'constructionTime': 180,  // seconds
        'helium3Tax': 1,
    },
    'Harvesters': {
        'name': 'Harvesters', 
        'attackHp': 25,
        'defenseHp': 20,
        'speed': 20000,
        'cargoSpace': 1000,
        'constructionTime': 120,  // seconds
        'helium3Tax': 1,
    },
    'Bombers': {
        'name': 'Bombers',
        'attackHp': 15,
        'defenseHp': 15,
        'speed': 10000,
        'cargoSpace': 1,
        'constructionTime': 500,  // seconds
        'helium3Tax': 1,
    },
    'Marauders': {
        'name': 'Marauders',
        'attackHp': 15,
        'defenseHp': 15,
        'speed': 17000,
        'cargoSpace': 450,  // Can only raid helium
        'constructionTime': 90,  // seconds
        'helium3Tax': 1,
    },
}

module.exports = {TROOPS_DATA, TROOP_COSTS, TROOP_CHOICES, BOMB_BUILDING_DAMAGE}