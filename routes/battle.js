var express = require('express');
var router = express.Router();

const Battle = require("../controllers/battles/battle")

router.ws("/", (ws, req) => {
    let newBattle = new Battle(ws);
    newBattle.init();

    ws.on("open", () => {
        console.log("Open")
        ws.send("Open")
    })

    ws.on("message", (msg) => {
        try {
            ws.send(msg);
        }
        catch {
            ws.send("Error, check the format of your message")
        }
    })
})

module.exports = router;