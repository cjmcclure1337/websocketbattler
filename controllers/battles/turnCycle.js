module.exports = class TurnCycle {
    constructor({battle, onNewEvent}) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.currentTeam = "hero"; //or villains
    }

    async turn() {
        //Get the caster
        let caster, enemy;
        if(this.battle.activeCombatant === "hero1") {
            caster = this.battle.combatants.hero1;
            enemy = this.battle.combatants.villain1;
        } else {
            caster = this.battle.combatants.villain1;
            enemy = this.battle.combatants.hero1;
        }
        

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            enemy
        });

        const resultingEvents = caster.getReplacedEvents(submission.action.success);
        
        for (let i=0; i<resultingEvents.length; i++) {
            const event = {
                ...resultingEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target
            }
            await this.onNewEvent(event);
        }

        //Check for post events
        const postEvents = caster.getPostEvents();
        for (let i=0; i<postEvents.length; i++) {
            const event = {
                ...postEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target
            }
            await this.onNewEvent(event);
        }

        //Check for status expire
        const expiredEvent = caster.decrementStatus();
        if(expiredEvent) {
            await this.onNewEvent(expiredEvent);
        }

        this.battle.activeCombatant = (this.battle.activeCombatant === "hero1") ? "villain1" : "hero1";
        console.log("Turn end health: ", caster.name, caster.health);
        console.log("Turn end health: ", enemy.name, enemy.health);
        this.turn();
    }

    async init() {
        await this.onNewEvent({
            type: "textMessage",
            text: "The battle is starting!"
        });

        //Start the first turn
        this.turn();
    }
}