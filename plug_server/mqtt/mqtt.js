const api = require('../api/plug')
const mqtt = require('mqtt')
const config = require('../../config/config')

const client = mqtt.connect({
  protocol: 'mqtt',
  host: config.MQTT_BROKER_IP,
  port: config.MQTT_BROKER_PORT
});

client.on('connect', function () {
  console.log('connected!');
  client.subscribe('plug/update')
});

client.on('message',function(topic,message){
  if(topic == 'plug/update'){
    const plug= message.toString();
    api.postParticularSensorStatus(plug)
  }
})
module.exports = client;