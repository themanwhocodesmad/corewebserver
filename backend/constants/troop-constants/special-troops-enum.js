
const SPECIAL_TROOP_COSTS = {
    'Gaea Guardians': {
        'Boron': 15000,
        'Oxygen': 5000,
        'Uranium': 20000,
        'Helium': 100,
    },
    'Phoenix Sentinels': {
        'Boron': 10000,
        'Oxygen': 8000,
        'Uranium': 18000,
        'Helium': 50,
    },
    'Stormbringer Ravagers': {
        'Boron': 12000,
        'Oxygen': 10000,
        'Uranium': 15000,
        'Helium': 150,
    },
}

const SPECIAL_TROOPS_DATA = {
    'Gaea Guardians': {
        'attack_hp': 500,
        'defense_hp': 500,
        'speed': 10000,
        'cargo_space': 250,
        'construction_time': 1000,  // seconds
        'helium_3_tax': 2,
    },
    'Phoenix Sentinels': {
        'attack_hp': 400,
        'defense_hp': 500,
        'speed': 12000,
        'cargo_space': 100,
        'construction_time': 800,  // seconds
        'helium_3_tax': 2,
    },
    'Stormbringer Ravagers': {
        'attack_hp': 500,
        'defense_hp': 400,
        'speed': 15000,
        'cargo_space': 250,
        'construction_time': 1200,  // seconds
        'helium_3_tax': 2,
    },
}

module.exports = {SPECIAL_TROOPS_DATA, SPECIAL_TROOP_COSTS}