const mqtt = require('mqtt')
const config = require('../../config/config')
const mqtt_client  = mqtt.connect({
  protocol: 'mqtt',
  host: config.MQTT_BROKER_IP,
  port: config.MQTT_BROKER_PORT  
})

mqtt_client.on('connect', function () {
  console.log('연결됨')
})

module.exports = mqtt_client