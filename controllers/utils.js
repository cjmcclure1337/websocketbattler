const characterData = require("../tables/characterTable");

const randInt = (max) => {
    return Math.floor(Math.random() * max) + 1
}

const generateCharacter = () => {
    let newChar = {};
    newChar.race = characterData.race[randInt(characterData.race.length) - 1]
    newChar.class = characterData.class[randInt(characterData.class.length) - 1]
    for (stat in characterData.stats) {
        newChar[characterData.stats[stat]] = randInt(10);
    }
    newChar.maxHealth = 75 + newChar.tough + randInt(40);
    newChar.health = newChar.maxHealth;
    newChar.level = 1;
    newChar.xp = 0;
    newChar.status = null;
    newChar.actions = characterData[newChar.class].actions;
    newChar.name = newChar.race + " " + newChar.class;
    return newChar;
}

const randomFromArray = (array) => {
    return array[ Math.floor(Math.random()*array.length) ]
}

module.exports = {
    generateCharacter,
    randomFromArray
}

