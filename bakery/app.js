var express = require("express");
var cookieParser = require("cookie-parser");
var cors = require('cors');

var port = 8888;

var app = express();

const getRnd = () => Math.floor(Math.random()*1000).toString();

function getPayload(randomNumber) {
    // randomNumber = randomNumber.substring(2, randomNumber.length);
    // var payload = `${randomNumber} # This is some random payload # 111`;
    var payload = `${randomNumber}-content`;
    return payload;
}

const corsOptions = {
    // Access-Control-Allow-Origin', hostname
    exposedHeaders: 'X-My-Custom-Header, X-Another-Custom-Header, Fake-Cookie',
    credentials: true,
    origin: true,
};

app.use(cookieParser());
app.use((req, res, next) => {
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        let rnd = getRnd();
        res.cookie('HungryCookie', getPayload(rnd), { maxAge: 900000, httpOnly: true });
        console.log(`cookie created [ ${rnd} ]`);
    }
    else {
        console.log('cookie exists', cookie);
    }
    next();
});
app.use(cors(corsOptions));

app.get("/test", (req, res, next) => {
    res.set('X-My-Custom-Header', 'Baba Vanga');
    res.set('Fake-Cookie', getPayload());
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
    next();
});

app.get("/gimmecookie", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8086/");
    res.json({"name":"ALL OK"});
    next();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});