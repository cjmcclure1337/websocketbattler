module.exports = {
    strike: {
        name: "strike",
        success: [
            {type: "textMessage", text: "{CASTER} strikes out!"},
            {type: "stateChange", damage: 30}
        ]
    },
    poisonStatus: {
        name: "Poison Powder",
        success: [
            {type: "textMessage", text: "{CASTER} throws {ACTION}! {TARGET} is feeling ill!"},
            {type: "stateChange", status: {type: "poisoned", expiresIn: 3}}
        ]
    },
    regenerateStatus: {
        name: "Pray",
        targetType: "friendly",
        success: [
            {type: "textMessage", text: "{CASTER} prays! They feel strengthenned."},
            {type: "stateChange", status: {type: "regenerating", expiresIn: 3}}
        ]
    },
    dazedStatus: {
        name: "Stunning Strike",
        success: [
            {type: "textMessage", text: "{CASTER} bonks {TARGET} on the head. They're dazed!"},
            {type: "stateChange", status: {type: "dazed", expiresIn: 5}}
        ]
    },
}