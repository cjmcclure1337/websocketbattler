var express = require('express');
var router = express.Router();

router.ws("/", (ws, req) => {
    ws.on("message", (msg) => {
        try {
            const parsedMessage = JSON.parse(msg);
            console.log(parsedMessage.name);
            ws.send(parsedMessage.name);
        }
        catch {
            ws.send("Error, check the format of your message")
        }
    })
})

module.exports = router;