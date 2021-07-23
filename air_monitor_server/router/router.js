const express = require('express')
const router = express.Router()
const api = require('../api/airmonitor')

// 에어모니터에서 지원하는 Capabilities 확인
router.get('/capabilities', (req,res)=>{
    api.getCapabilities().then(data=>res.json(data)).catch(err=>res.json(err))
})

// 에어모니터의 네트워크 연결 확인
router.get('/network_status', (req,res)=>{
    api.getNetworkStatus().then(data=>res.json(data)).catch(err=>res.json(err))
})

// 에어모니터의 센서 수치 확인
router.get('/sensor_status', (req,res)=>{
    api.getSensorStatus().then(data=>res.json(data)).catch(err=>res.json(err))
})

// 에어모니터의 특정 센서의 수치 확인
router.get('/sensor_status/:capability', (req,res)=>{
    const capability = req.params.capability
    api.getParticularSensorStatus(capability).then(data=>res.json(data)).catch(err=>res.json(err))
})

module.exports = router