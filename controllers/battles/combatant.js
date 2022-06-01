const Utility = require("../utils")

module.exports = class Combatant {
    constructor(config, battle) {
        this.battle = battle;
        Object.keys(config).forEach(key => {
            this[key] = config[key];
        })
    }

    createElement() {

    }

    getReplacedEvents(originalEvents) {

      if(this.status?.type === "dazed" && Utility.randomFromArray([true, false, false])) {
        return [
          { type: "textMessage", text: `${this.name} is disoriented!`}
        ]
      }

      return originalEvents;
    }

    getPostEvents() {

      if(this.status?.type === "regenerating") {
        return [
          {type: "textMessage", text: "{CASTER} recovers some health"},
          {type: "stateChange", recover: 5, onCaster: true}
        ]
      }

      if(this.status?.type === "poisoned") {
        return [
          {type: "textMessage", text: "{CASTER} is hurt by the poison"},
          {type: "stateChange", damage: 5, onCaster: true}
        ]
      }

      return [];
    }

    decrementStatus() {
      console.log("Decrementing status")
      if (this.status?.expiresIn > 0) {
        this.status.expiresIn -= 1;
        console.log("Turns remaining on status: ", this.status.expiresIn)
        if (this.status.expiresIn === 0) {
          console.log("Removing status")
          const statusName = this.status.type;
          this.update({
            status: null
          })
          return {
            type: "textMessage",
            text: "{CASTER} is no longer " + statusName,
            caster: this
          }
        }
      }

      return null;
    }

    update(changes={}) {
        //Update anything incoming
        Object.keys(changes).forEach(key => {
          this[key] = changes[key]
        });
      }

    init(container) {

    }
}