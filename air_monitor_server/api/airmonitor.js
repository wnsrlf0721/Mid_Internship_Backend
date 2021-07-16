const config = require('../../config/config');
const authedAxios = require('../../auth/auth');

const DEVICE_ID= 'fd0d58e1-f606-4b33-9c56-af51aa29109d';

// 에어모니터에서 지원하는 Capabilities 확인
function getCapabilities(){
    return new Promise((resolve, reject)=>{
            const url = `${config.URL}/${DEVICE_ID}`
            authedAxios.get(url).then((result)=>{
                const capabilities = result.data.components[0].capabilities.map(capability => capability.id)
                resolve(capabilities)
        }).catch((err)=>{
            if(err) {
                const err_message = `${err} 오류가 발생했습니다`
                reject(err_message)
            }
        })    
    })
}


// 에어모니터의 이름, ID, Capabilties 등 Smartthings API에서 제공하는 에어모니터의 제원 확인
function getDescription(){
    return new Promise((resolve, reject)=>{
        const url = `${config.URL}/${DEVICE_ID}`
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
                resolve(sensor)
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
    getCapabilities, getDescription, getNetworkStatus, getParticularSensorStatus, getSensorStatus
}