const express = require('express');
const app = express();

//save standard data to config.js 
const config = require('./config/config');
const client = require('./mqtt/control');
const func = require('./IoT_function');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//localhost:3000 페이지 실행
app.get('/',function(){
    //제어 서버로부터 mqtt 메시지를 받는 상황
    client.on('message',function(topic,message){
        const parse = JSON.parse(message.toString());

        if(topic=='bulb/sensor_status'){ 
            func.read_bulb(parse);
        }

        else if(topic=='plug/sensor_status'){
            func.read_plug(parse);
        }

        else if(topic=='airmonitor/sensor_status'){
            func.read_air(parse);
        }

        //Door sensor 디바이스 서버에서 보내주는 message 처리
        else if(topic=='door/sensor_status'){
            func.read_door(parse);
        }

        //motion sensor 디바이스 서버에서 보내주는 message 처리
        else if(topic=='motion/sensor_status'){
            func.read_motion(parse);
        }
    });
});

//post method를 이용해 제어서버로 mqtt메시지 전송, control할 수 있는 서버는 전구, 스마트플러그 2가지 가능
app.post('/bulb/command', function(req,res){
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
    client.publish('bulb/update',JSON.stringify(req.body));
    res.send(200);
});
app.post('/plug/command', function(req,res){
    client.publish('plug/update',JSON.stringify(req.body));
    res.send(200);
});

app.listen(config.PORT, function(){
    console.log(`Server is up and running on port ${config.PORT}`);
});