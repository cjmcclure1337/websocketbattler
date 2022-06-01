const Actions = require("../../tables/actionTable")

module.exports = class SubmissionMenu {
    constructor({ caster, enemy, onComplete }) {
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;
    }

    decide() {
        this.onComplete({
            action: Actions[this.caster.actions[0]],
            target: this.enemy
        })
    }

    init() {

        if(this.caster.isPlayerControlled) {
            //Space for player selection if that's ever added
        } else {
            this.decide();
        }
        
    }
}