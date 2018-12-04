var express = require("express");
var cookieParser = require("cookie-parser");
var cors = require('cors');

var port = 8888;

var app = express();

function getPayload() {
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    var payload = `|${randomNumber} # |This is some random payload # |111`;
    return payload;
}

const corsOptions = {
    exposedHeaders: 'X-My-Custom-Header, X-Another-Custom-Header, Fake-Cookie',
    credentials: true,
    origin: true,
};

app.use(cookieParser());
app.use((req, res, next) => {
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        res.cookie('HungryCookie', getPayload(), { maxAge: 900000, httpOnly: true });
        console.log('cookie created');
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
    res.header
    res.json(["Test"]);
    next();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});