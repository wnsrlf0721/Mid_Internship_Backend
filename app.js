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

//localhost:3000 페이지 실행
app.get('/',function(req,res){
    websocket(server);
});

//post method를 이용해 제어서버로 mqtt메시지 전송, control할 수 있는 서버는 전구, 스마트플러그 2가지 가능
app.post('/bulb/command', function(req,res){
    client.publish('bulb/update',JSON.stringify(req.body));
    res.send(200);
});
app.post('/plug/command', function(req,res){
    client.publish('plug/update',JSON.stringify(req.body));
    res.send(200);
});

server.listen(config.PORT, function(){
    console.log(`Server is up and running on port ${config.PORT}`);
});
    // {
    //     "commands": [
    //         {
    //             "component": "main",
    //             "capability": "switch",
    //             "command": "on",
    //             "arguments": [
    //             ]
    //         },
    //         {
    //             "component": "main",
    //             "capability": "colorControl",
    //             "command": "setHue",
    //             "arguments": [
    //                 80
    //             ]
    //         }
    //     ]
    // }