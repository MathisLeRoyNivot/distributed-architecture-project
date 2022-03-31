const express = require("express");
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

// Start server
app.listen(process.env.PORT || 8888, () => {
  console.log(`Server listening`, process.env.PORT || 8888);
});