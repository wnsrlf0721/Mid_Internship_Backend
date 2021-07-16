const mqtt = require('mqtt');
const config = require('../config/config');

const client = mqtt.connect({
  protocol: 'mqtt',
  host: config.MQTT_BROKER_IP,
  port: config.MQTT_BROKER_PORT
});

client.on('connect', function () {
  console.log('connected!');
  //IoT 센서 정보를 주는 topic들을 subscribe
  client.subscribe('airmonitor/sensor_status')
  client.subscribe('bulb/sensor_status')
  client.subscribe('plug/sensor_status')
});
module.exports = client;