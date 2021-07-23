const client = require('./mqtt/mqtt')
const api = require('./api/motion')

const scheduler = function(){
    // 10초마다 센서의 수치 전달
    setInterval(()=>{
        let newObj = new Object;
        api.getCapabilities().then(data=>{
            Object.assign(newObj, data);
            api.getSensorStatus().then(data=>{
                Object.assign(newObj,data);
                client.publish('motion/sensor_status',JSON.stringify(newObj));
            });
        });
    }, 10*1000)
}


module.exports= scheduler;