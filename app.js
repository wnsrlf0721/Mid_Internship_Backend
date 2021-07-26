const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const websocket = require('./socket');

//save standard data to config.js 
const config = require('./config/config');
const client = require('./mqtt/control');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

server.listen(config.PORT, function(){
    console.log(`Server is up and running on port ${config.PORT}`);
});

websocket(server);