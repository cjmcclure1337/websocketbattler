module.exports = {
    race: [
        "elf", "human", "dwarf", "halfling"
    ],
    class: [
        "wizard", "thief", "fighter", "priest", "hunter", "bard"
    ],
    stats: [
        "strong", "nimble", "clever", "tough", "determined", "lucky"
    ],
    wizard: {
        actions: ["regenerateStatus", "strike"]
    },
    theif: {
        actions: ["poisonStatus", "strike"]
    },
    fighter: {
        actions: ["strike"]
    },
    priest: {
        actions: ["regenerateStatus", "strike"]
    },
    hunter: {
        actions: ["poisonStatus", "strike"]
    },
    bard: {
        actions: ["poisonStatus", "strike"]
    }
}