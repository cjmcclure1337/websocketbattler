const SubmissionMenu = require("./submissionMenu");
const TextMessage = require("./textMessage");

module.exports = class BattleEvent {
    constructor(event, battle) {
        this.event = event;
        this.battle = battle;
    }

    textMessage(resolve) {

        const text = this.event.text
        .replace("{CASTER}", this.event.caster?.name)
        .replace("{TARGET}", this.event.target?.name)
        .replace("{ACTION}", this.event.action?.name)
        
         const message = new TextMessage({
            text,
            onComplete: () => {
                resolve();
            }
        }, this.battle.socket)
        message.init();
        
    }

    stateChange(resolve) {
        const {caster, target, damage, recover, status, action} = this.event;
        let who = this.event.onCaster ? caster : target;
        if(action && action.targetType === "friendly") {
            who = caster;
        }

        if(damage) {
            who.update({
                health: who.health - damage
            })
            let text = `${who.name} takes ${damage} damage! They only have ${who.health} health left!`
            const message = new TextMessage({
                text,
                onComplete: () => {
                    resolve();
                }
            }, this.battle.socket)
            message.init();
        }

        if(recover) {
            let newHealth = who.health + recover;
            if (newHealth > who.maxHealth) {
                newHealth = who.maxHealth;
            }
            who.update({
                health: newHealth
            })
        }

        if(status) {
            who.update({
                status: {...status}
            })
        }
        if(status===null) {
            who.update({
                status:null
            })
        }

        resolve();
    }

    submissionMenu(resolve) {
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            onComplete: submission => {
                //submission {what move to use, who o use it on}
                resolve(submission)
            }
        })

        menu.init();
    }

    init(resolve) {
        console.log("Resolving event type: ", this.event.type)
        this[this.event.type](resolve)
    }
}