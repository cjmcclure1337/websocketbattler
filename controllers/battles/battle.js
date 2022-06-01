const Combatant = require("./combatant");
const BattleEvent = require("./battleEvent");
const TurnCycle = require("./turnCycle");
const Utility = require("../utils.js")

module.exports = class Battle {
    constructor(ws) {
        console.log("Generating battle")
        this.socket = ws;
        let hero1 = Utility.generateCharacter();
        hero1.team = "hero";
        hero1.status = {type: "dazed", expiresIn: 3};
        console.log("Hero: ", hero1)
        let villain1 = Utility.generateCharacter();
        console.log("Villain: ", villain1);
        villain1.team = "villain";
        this.combatants = {
            "hero1": new Combatant(hero1, this),
            "villain1": new Combatant(villain1, this)
        }
        this.activeCombatant = "hero1"
    }

    createElement() {

    }

    init() {
        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            //combatant.init();
        })

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this)
                    battleEvent.init(resolve);
                })
            }
        })
        this.turnCycle.init();
        
    }
}