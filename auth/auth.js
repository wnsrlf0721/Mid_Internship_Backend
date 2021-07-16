const axios = require('axios')
const config =require('../config/config')

const authedAxios = axios.create({
    headers: {
        Authorization: `Bearer ${config.SMARTTHINGS_ACCESS_TOKEN}`
    }
})

module.exports = authedAxios