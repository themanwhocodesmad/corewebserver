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
        'attack_hp': 100,
        'defense_hp': 25,
        'speed': 9000,
        'cargo_space': 120,
        'construction_time': 160,  // seconds
        'helium_3_tax': 1,
    },
    'Assault_Tanks': {
        'attack_hp': 250,
        'defense_hp': 70,
        'speed': 11000,
        'cargo_space': 50,
        'construction_time': 300,  // seconds
        'helium_3_tax': 1,
    },
    'Drone_Troopers': {
        'attack_hp': 175,
        'defense_hp': 150,
        'speed': 15000,
        'cargo_space': 180,
        'construction_time': 385,  // seconds
        'helium_3_tax': 1,
    },
    'Sentinels': {
        'attack_hp': 80,
        'defense_hp': 150,
        'speed': 8000,
        'cargo_space': 100,
        'construction_time': 180,  // seconds
        'helium_3_tax': 1,
    },
    'harvesters': {
        'attack_hp': 25,
        'defense_hp': 20,
        'speed': 20000,
        'cargo_space': 1000,
        'construction_time': 120,  // seconds
        'helium_3_tax': 1,
    },
    'Bombers': {
        'attack_hp': 15,
        'defense_hp': 15,
        'speed': 10000,
        'cargo_space': 1,
        'construction_time': 500,  // seconds
        'helium_3_tax': 1,
    },
    'Marauders': {
        'attack_hp': 15,
        'defense_hp': 15,
        'speed': 17000,
        'cargo_space': 450,  // Can only raid helium
        'construction_time': 90,  // seconds
        'helium_3_tax': 1,
    },
}

module.exports = {TROOPS_DATA, TROOP_COSTS, TROOP_ChOICES, BOMB_BUILDING_DAMAGE}