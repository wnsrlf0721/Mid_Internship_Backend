const config = require('../../config/config');
const authedAxios = require('../../auth/auth');

const DEVICE_ID = 'e4d41df7-e244-4890-b6c1-767c52d83119';

//Capabilities 확인
function getCapabilities(){
    return new Promise((resolve, reject)=>{
            const url = `${config.URL}/${DEVICE_ID}`
            authedAxios.get(url).then((result)=>{
                let concat_data = new Object();
                concat_data.deviceId = result.data.deviceId;
                concat_data.label = result.data.label;
                concat_data.categories= result.data.components[0].categories[0].name;
                resolve(concat_data);
        }).catch((err)=>{
            if(err) {
                const err_message = `${err} 오류가 발생했습니다`
                reject(err_message)
            }
        })    
    })
}

//네트워크 연결 확인
function getNetworkStatus(){
    return new Promise((resolve, reject)=>{
        const url = `${config.URL}/${DEVICE_ID}/status`
        authedAxios.get(url).then((result)=>{
            const network_status = {...result.data.components.main.healthCheck, ...result.data.components.main.battery}
            resolve(network_status)
        }).catch((err)=>{
            if(err) {
                const err_message = `${err} 오류가 발생했습니다`
                reject(err_message)
            }
        })    
    })
}

//센서 수치 확인
function getSensorStatus(){
    return new Promise((resolve, reject)=>{
            const url = `${config.URL}/${DEVICE_ID}/status`
            authedAxios.get(url).then((result)=>{
                const sensor=result.data.components.main
                let concat_data = new Object();
                //motion data
                concat_data.motion = sensor.motionSensor.motion.value;
                //battery data
                concat_data.battery = sensor.battery.battery.value;
                resolve(concat_data);
        }).catch((err)=>{
            if(err) {
                const err_message = `${err} 오류가 발생했습니다`
                reject(err_message)
            }
        })
    })
}


//특정 센서의 수치 확인
function getParticularSensorStatus(capability){
    return new Promise((resolve, reject)=>{
            const url = `${config.URL}/${DEVICE_ID}/components/main/capabilities/${capability}/status`
            authedAxios.get(url).then((result)=>{
                resolve(result.data)
        }).catch((err)=>{
            if(err){
                const err_message = `${err} 오류가 발생했습니다`
                reject(err_message)
            }
        })    
    })
}

module.exports = {
    getCapabilities, getNetworkStatus, getParticularSensorStatus, getSensorStatus
}