const express = require('express');
const app = express();

//save standard data to config.js 
const config = require('./config/config');
const client = require('./mqtt/control');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//localhost:3000 페이지 실행
app.get('/',function(req,res){
    let bulb= ['',''];
    let plug= ['',''];
    let airmonitor= "";

    //제어 서버로부터 mqtt 메시지를 받는 상황
    client.on('message',function(topic,message){
        if(topic=='bulb/sensor_status'){ message.toString();
            const parse = JSON.parse(message.toString());
            bulb[0]= parse[0];
            bulb[1]= parse[1];
            console.log(bulb);
        }

        else if(topic=='plug/sensor_status'){
            const parse = JSON.parse(message.toString());
            plug[0]= parse[0];
            plug[1]= parse[1];
            console.log(plug);
        }

        else if(topic=='airmonitor/sensor_status'){
            const parse = JSON.parse(message.toString());
            airmonitor = parse;
            console.log(airmonitor);
        }
    });
});

//post method를 이용해 제어서버로 mqtt메시지 전송
app.post('/bulb/command', function(req,res){
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