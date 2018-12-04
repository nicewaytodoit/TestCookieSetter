var express = require("express");
var cookieParser = require("cookie-parser");

var port = 8888;

var app = express();
app.use(cookieParser());
app.use((req, res, next) => {
    var cookie = req.cookies.cookieName;
    if (cookie === undefined)
    {
      var randomNumber=Math.random().toString();
      randomNumber=randomNumber.substring(2, randomNumber.length);
      var payload = `${randomNumber} # This is some random payload # 111`;
      res.cookie('HungryCookie', payload, { maxAge: 900000, httpOnly: true });
      console.log('cookie created');
    } 
    else
    {
      console.log('cookie exists', cookie);
    } 
    next();
});

app.get("/test", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
    next();
});

app.get("/gimmecookie", (req, res, next) => {
    res.json(["Test"]);
    next();
});

app.listen(port, () => {
 console.log("Server running on port 3000");
});