const client = require('./mqtt/mqtt')
const api = require('./api/huebulb')

const scheduler = function(){
    // 10초마다 센서의 수치 전달
    setInterval(()=>{
        let newObj1 = new Object;
        let newObj2 = new Object;
        api.getCapabilities().then(data=>{
            Object.assign(newObj1, data[0]);
            Object.assign(newObj2, data[1]);
            api.getSensorStatus().then(data=>{
                Object.assign(newObj1, data[0]);
                Object.assign(newObj2, data[1]);
                const concat = [newObj1,newObj2];
                client.publish('bulb/sensor_status',JSON.stringify(concat));
            });
        });
    }, 10* 1000)
}


module.exports= scheduler;