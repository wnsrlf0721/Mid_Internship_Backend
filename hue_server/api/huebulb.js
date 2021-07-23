const config = require('../../config/config');
const authedAxios = require('../../auth/auth');
//bulb port number 9 , 11
const DEVICE_ID = ['fa639f2b-c275-435c-add8-2b63506973ef',
    '15095a4e-2286-4fd0-a6ea-efa2c480d056'];

//Capabilities 확인 (공통)
function getCapabilities(){
    const url_data = [`${config.URL}/${DEVICE_ID[0]}`,
    `${config.URL}/${DEVICE_ID[1]}`];
    const p1 = new Promise(resolve=>{
        authedAxios.get(url_data[0]).then(result=>{
            let concat_data = new Object();
            concat_data.deviceId = result.data.deviceId;
            concat_data.label = result.data.label;
            concat_data.categories= result.data.components[0].categories[0].name;
            resolve(concat_data);
        })
    })
    const p2 = new Promise(resolve=>{
        authedAxios.get(url_data[1]).then(result=>{
            let concat_data = new Object();
            concat_data.deviceId = result.data.deviceId;
            concat_data.label = result.data.label;
            concat_data.categories= result.data.components[0].categories[0].name;
            resolve(concat_data);
        })
    })
    return Promise.all([p1,p2]);
}


//healthStatus 확인
function gethealthStatus(){
    const url_data = [`${config.URL}/${DEVICE_ID[0]}/status`,
    `${config.URL}/${DEVICE_ID[1]}/status`];
    const p1 = new Promise(resolve=>{
        authedAxios.get(url_data[0]).then(result=>{
            const health_status = result.data.components.main.healthCheck
            resolve(health_status)
        })
    })
    const p2 = new Promise(resolve=>{
        authedAxios.get(url_data[1]).then(result=>{
            const health_status = result.data.components.main.healthCheck
            resolve(health_status)
        })
    })
    return Promise.all([p1,p2])
}

//센서 수치 확인
function getSensorStatus(){
    const url_data = [`${config.URL}/${DEVICE_ID[0]}/status`,
    `${config.URL}/${DEVICE_ID[1]}/status`];
    const p1 = new Promise(resolve=>{
        authedAxios.get(url_data[0]).then(result=>{
            const sensor=result.data.components.main
            let colorControl = sensor.colorControl;
            let concat_data = new Object();
            concat_data.sat = colorControl.saturation.value;
            concat_data.hue = colorControl.hue.value;
            concat_data.switch = sensor.switch.switch.value;
            resolve(concat_data)
        })
    })
    const p2 = new Promise(resolve=>{
        authedAxios.get(url_data[1]).then(result=>{
            const sensor=result.data.components.main
            let colorControl = sensor.colorControl;
            let concat_data = new Object();
            concat_data.sat = colorControl.saturation.value;
            concat_data.hue = colorControl.hue.value;
            concat_data.switch = sensor.switch.switch.value;
            resolve(concat_data)
        })
    })

    return Promise.all([p1,p2]);
}


//특정 센서의 수치 확인
function getParticularSensorStatus(capability){
    const url_data= [`${config.URL}/${DEVICE_ID[0]}/components/main/capabilities/${capability}/status`,
    `${config.URL}/${DEVICE_ID[1]}/components/main/capabilities/${capability}/status`];
    const p1 = new Promise(resolve=>{
        authedAxios.get(url_data[0]).then(result=>{
            resolve(result.data)
        })
    })
    const p2 = new Promise(resolve=>{
        authedAxios.get(url_data[1]).then(result=>{
            resolve(result.data)
        })
    })

    return Promise.all([p1,p2]);
}

//특정 센서의 수치 업데이트
function postParticularSensorStatus(message){
    const url_data=[`${config.URL}/${DEVICE_ID[0]}/commands`,
    `${config.URL}/${DEVICE_ID[1]}/commands`];
    const p1 = new Promise(resolve=>{
        authedAxios.post(url_data[0],message).then(result=>{
            resolve(result.data.results)
        })
    })
    const p2 = new Promise(resolve=>{
        authedAxios.post(url_data[1],message).then(result=>{
            resolve(result.data.results)
        })
    })
    return Promise.all([p1,p2]);
}

module.exports = {
    getCapabilities, gethealthStatus, getSensorStatus, getParticularSensorStatus, postParticularSensorStatus
}