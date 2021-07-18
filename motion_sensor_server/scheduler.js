const client = require('./mqtt/mqtt')
const api = require('./api/motion')

const scheduler = function(){
    // 1초마다 센서의 수치 전달
    setInterval(()=>{
        api.getSensorStatus().then(data=>{
            client.publish('motion/sensor_status', JSON.stringify(data))  
            //console.log('send sensorinfo!')  
        })
    }, 1000)
}


module.exports= scheduler;