const config = require('../../config/config');
const authedAxios = require('../../auth/auth');

const DEVICE_ID= 'fd0d58e1-f606-4b33-9c56-af51aa29109d';

// 에어모니터에서 지원하는 Capabilities 확인
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

// 에어모니터의 네트워크 연결 확인
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

// 에어모니터의 센서 수치 확인
function getSensorStatus(){
    return new Promise((resolve, reject)=>{
            const url = `${config.URL}/${DEVICE_ID}/status`
            authedAxios.get(url).then((result)=>{
                const sensor=result.data.components.main
                let concat_data = new Object();
                //co2 data
                concat_data.co2_measure = sensor.carbonDioxideMeasurement.carbonDioxide.value;
                concat_data.co2_concern = sensor.carbonDioxideHealthConcern.carbonDioxideHealthConcern.value;
                //dust data
                concat_data.dust_measure = sensor.dustSensor.dustLevel.value;
                concat_data.dust_concern = sensor.dustHealthConcern.dustHealthConcern.value;
                //fdust data
                concat_data.fineDust_measure = sensor.dustSensor.fineDustLevel.value;
                concat_data.fineDust_concern = sensor.fineDustHealthConcern.fineDustHealthConcern.value; 
                //vfdust data
                concat_data.veryfineDust_measure = sensor.veryFineDustSensor.veryFineDustLevel.value;
                concat_data.veryfineDust_concern = sensor.veryFineDustHealthConcern.veryFineDustHealthConcern.value;
                //illu data
                concat_data.illuminance = sensor.illuminanceMeasurement.illuminance.value;
                //humid data
                concat_data.humidity = sensor.relativeHumidityMeasurement.humidity.value;
                //temperature data
                concat_data.temperature = sensor.temperatureMeasurement.temperature.value;
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


// 에어모니터의 특정 센서의 수치 확인
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