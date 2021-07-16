const mqtt_client = require('./mqtt/mqtt')
const api = require('./api/airmonitor')

const scheduler = function(){
    //1초마다 센서의 연결상태 전달

    // 1초마다 센서의 수치 전달
    setInterval(()=>{
        api.getSensorStatus().then(data=>{
            mqtt_client.publish('airmonitor/sensor_status', JSON.stringify(data))  
        })
    }, 1000)
}

module.exports = scheduler;