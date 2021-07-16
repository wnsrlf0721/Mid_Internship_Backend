const express = require('express');
const router = express.Router()
const api = require('../api/plug');

//Capabilities 확인
router.get('/capabilities', (req,res)=>{
    api.getCapabilities().then(data=>{res.header("Content-Type",'application/json');res.json(data)}).catch(err=>res.json(err))
})

//health_status 확인
router.get('/health_status', (req,res)=>{
    api.gethealthStatus().then(data=>res.json(data)).catch(err=>res.json(err))
})

//센서 수치 확인 (필수)
router.get('/sensor_status', (req,res)=>{
    api.getSensorStatus().then(data=>res.json(data)).catch(err=>res.json(err))
})

//특정 센서의 수치 확인
router.get('/sensor_status/:capability', (req,res)=>{
    const capability = req.params.capability
    api.getParticularSensorStatus(capability).then(data=>res.json(data)).catch(err=>res.json(err))
})

//특정 센서 수치 업데이트
router.post('/sensor_status/update',(req,res)=>{
    const message = req.body;
    console.log(message);
    api.postParticularSensorStatus(message).then(data=>res.json(data)).catch(err=>res.json(err))
})

module.exports = router
