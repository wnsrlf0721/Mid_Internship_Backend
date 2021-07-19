const express = require('express');
const app = express();

//save standard data to config.js 
const config = require('./config/config');
const client = require('./mqtt/control');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// //mongoDB 생성 및 관리
// var mongoose =require('mongoose');

// var db = mongoose.connection;

// db.on('errer', console.error);
// db.once('open',function(){
//     console.log('Connected to DB!');
// });

// mongoose.connect('mongodb://localhost/mongodb_tutorial');

// var bulb_db = mongoose.Schema({
//     id: String,
//     color: String,
//     switch: String
// })

// var Bulb = mongoose.model('Schema',bulb_db);

// var newBulb = new Bulb({

// })
function bulb(){
    this.sat = '';
    this.hue = '';
    this.switch = '';
}
let bulb1 = new bulb();
let bulb2 = new bulb();

let bulb_arr= [bulb1,bulb2];

function plug(){
    this.power = '';
    this.energy = '';
    this.switch = '';
}

let plug1= new plug();
let plug2= new plug();
let plug_arr= [plug1,plug2];

let airmonitor= new Array();
for (var i=0;i<8;i++){
    airmonitor[i] = '';
}

let doorsensor= ['','','']; //[0] - contact(문열림 여부), [1] - accel(움직임 감지), [2] - battery

let motion=['','']; //[0] - motion value , [1] - battery value

//localhost:3000 페이지 실행
app.get('/',function(req,res){
    //제어 서버로부터 mqtt 메시지를 받는 상황
    client.on('message',function(topic,message){
        if(topic=='bulb/sensor_status'){ 
            const parse = JSON.parse(message.toString());

            const color = [parse[0].colorControl,
            parse[1].colorControl];

            const sat = [color[0].saturation.value,
            color[1].saturation.value];

            const hue = [color[0].hue.value,
            color[1].hue.value];

            const swch = [parse[0].switch.switch.value,
            parse[1].switch.switch.value];

            //sat value
            if(bulb_arr[0].sat != sat[0]){
                bulb_arr[0].sat= sat[0];
                console.log('sat1: ',bulb_arr[0].sat);
            }
            if(bulb_arr[1].sat != sat[1]){
                bulb_arr[1].sat= sat[1];
                console.log('sat2: ',bulb_arr[1].sat);
            }

            //hue value
            if(bulb_arr[0].hue!=hue[0]){
                bulb_arr[0].hue=hue[0];
                console.log('hue1: ',bulb_arr[0].hue);
            }
            if(bulb_arr[1].hue!=hue[1]){
                bulb_arr[1].hue=hue[1];
                console.log('hue2: ',bulb_arr[1].hue);
            }

            //switch
            if(bulb_arr[0].switch!=swch[0]){
                bulb_arr[0].switch=swch[0];
                console.log('on/off1: ',bulb_arr[0].switch);
            }
            if(bulb_arr[1].switch!=swch[1]){
                bulb_arr[1].switch=swch[1];
                console.log('on/off2: ',bulb_arr[1].switch);
            }
        }

        else if(topic=='plug/sensor_status'){
            const parse = JSON.parse(message.toString());

            const power = [parse[0].powerMeter.power.value,
            parse[1].powerMeter.power.value];

            // const power_consumption = [parse[0].powerConsumptionReport.powerConsumption.value,
            // parse[1].powerConsumptionReport.powerConsumption.value];

            const energy = [parse[0].energyMeter.energy.value,
            parse[1].energyMeter.energy.value];

            const swch = [parse[0].switch.switch.value,
            parse[1].switch.switch.value]; 

            //power
            if(plug_arr[0].power!=power[0]){
                plug_arr[0].power=power[0]
                console.log('Power1: ',plug_arr[0].power)
            }
            if(plug_arr[1].power!=power[1]){
                plug_arr[1].power=power[1]
                console.log('Power2: ',plug_arr[1].power)
            }

            //energy
            if(plug_arr[0].energy!=energy[0]){
                plug_arr[0].energy=energy[0]
                console.log('Energy1: ',plug_arr[0].energy)
            }
            if(plug_arr[1].energy!=energy[1]){
                plug_arr[1].energy=energy[1];
                console.log('Energy2: ',plug_arr[1].energy);
            }

            //swch
            if(plug_arr[0].switch!=swch[0]){
                plug_arr[0].switch=swch[0]
                console.log('Switch1: ',plug_arr[0].switch);
            }
            if(plug_arr[1].switch!=swch[1]){
                plug_arr[1].switch=swch[1];
                console.log('Switch2: ',plug_arr[1].switch);
            }
        }

        else if(topic=='airmonitor/sensor_status'){
            const parse = JSON.parse(message.toString());

            const co2_measure = parse.carbonDioxideMeasurement.carbonDioxide.value; //co2 value [0]
            //const co2_concern = parse.carbonDioxideHealthConcern.carbonDioxideHealthConcern.value; 

            const dust_measure= parse.dustSensor.dustLevel.value; //먼지 [1]
            //const dust_concern = parse.dustHealthConcern.dustHealthConcern.value; 

            const fineDust_measure = parse.dustSensor.fineDustLevel.value; //미세먼지 [2]
            //const fineDust_concern = parse.fineDustHealthConcern.fineDustHealthconcern.value; 

            const veryfineDust_measure =parse.veryFineDustSensor.veryFineDustLevel.value; //초미세먼지 [3]
            //const veryfineDust_concern =parse.veryfineDustHealthConcern.veryfineDustHealthConcern.value; 

            const illuminance = parse.illuminanceMeasurement.illuminance.value; //조도 [4]
            const humidity = parse.relativeHumidityMeasurement.humidity.value; //습도 [5]

            const temperature = parse.temperatureMeasurement.temperature.value; //온도 [6]
            const battery = parse.battery.battery.value; // 배터리 [7]
            if(airmonitor[0]!=co2_measure){
                airmonitor[0]=co2_measure;
                console.log('Co2: ',airmonitor[0]);
            }
            if(airmonitor[1]!=dust_measure){
                airmonitor[1]=dust_measure;
                console.log('dust: ',airmonitor[1]);
            }
            if(airmonitor[2]!=fineDust_measure){
                airmonitor[2]=fineDust_measure;
                console.log('fineDust: ',airmonitor[2]);
            }
            if(airmonitor[3]!=veryfineDust_measure){
                airmonitor[3]=veryfineDust_measure;
                console.log('veryfineDust: ',airmonitor[3]);
            }
            if(airmonitor[4]!=illuminance){
                airmonitor[4]=illuminance;
                console.log('조도: ',airmonitor[4]);
            }
            if(airmonitor[5]!=humidity){
                airmonitor[5]=humidity;
                console.log('습도: ',airmonitor[5]);
            }
            if(airmonitor[6]!=temperature){
                airmonitor[6]=temperature;
                console.log('temperature: ',airmonitor[6]);
            }
            if(airmonitor[7]!=battery){
                airmonitor[7]=battery;
                console.log('battery: ',airmonitor[7]);
            }
        }

        //Door sensor 디바이스 서버에서 보내주는 message 처리
        else if(topic=='door/sensor_status'){
            const parse = JSON.parse(message.toString());
            const contact = parse.contactSensor.contact.value; //[0]
            const accelsensor = parse.accelerationSensor.acceleration.value; //[1]
            const battery = parse.battery.battery.value;//[2]
            if(doorsensor[0]!= contact){
                doorsensor[0]=contact;
                console.log('door: ',doorsensor[0]);
            }
            if(doorsensor[1]!= accelsensor){
                doorsensor[1]=accelsensor;
                console.log('accel motion: ',doorsensor[1]);
            }
            if(doorsensor[2]!= battery){
                doorsensor[2]=battery;
                console.log('battery: ',doorsensor[2]);
            }
        }

        //motion sensor 디바이스 서버에서 보내주는 message 처리
        else if(topic=='motion/sensor_status'){
            const parse = JSON.parse(message.toString());

            const mot = parse.motionSensor.motion.value;
            if(motion[0]!=mot){
                motion[0]=mot;
                console.log('motion: ',motion[0]);
            }

            const battery = parse.battery.battery.value;
            if(motion[1]!=battery){
                motion[1]=battery;
                console.log('battery: ', motion[1]);
            }
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