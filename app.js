var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var cron = require('node-cron');
var cookieParser = require('cookie-parser');

const characterRoute = require("./routes/characters");
const echoRoute = require("./routes/echo")
const battleRoute = require("./routes/battle")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/characters", characterRoute);

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});

app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    const parsedMessage = JSON.parse(msg);
    console.log(parsedMessage.key);
    ws.send(parsedMessage.key);
  });
  console.log('Home socket connected');
});

app.use("/echo", echoRoute);
app.use("/battle", battleRoute);

app.ws("/countdown", (ws, req) => {
    ws.on("message", (message) => {
        let i = Number(message);
        cron.schedule("* * * * * *", () => {
            ws.send(i);
            i--;
        })
        ws.send("Counting down:")
    })
    console.log("Countdown socket connected")
})

app.listen(3000);