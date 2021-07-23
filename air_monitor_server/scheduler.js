const mqtt_client = require('./mqtt/mqtt')
const api = require('./api/airmonitor')

const scheduler = function(){
    // 10초마다 센서의 수치 전달 (SMARTTHINGS의 Rate limit: 12 requests per minute으로 제한됨)
    setInterval(()=>{
        let newObj = new Object;
        api.getCapabilities().then(data=>{
            Object.assign(newObj, data);
            api.getSensorStatus().then(data=>{
                Object.assign(newObj,data);
                mqtt_client.publish('airmonitor/sensor_status',JSON.stringify(newObj));
            });
        });
    }, 10* 1000);
}

module.exports = scheduler;