const axios = require('axios')
const mqtt = require('mqtt')
const config = require('../../config/config')
const api =require('../api/huebulb')

const client = mqtt.connect({
  protocol: 'mqtt',
  host: config.MQTT_BROKER_IP,
  port: config.MQTT_BROKER_PORT
});

client.on('connect', function () {
  console.log('connected!');
  client.subscribe('bulb/update');
});

client.on('message',function(topic,message){
  if(topic=='bulb/update'){
    const bulb_data = JSON.parse(message.toString());
    api.postParticularSensorStatus(bulb_data)
  }
})
module.exports = client;