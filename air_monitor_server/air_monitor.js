const express = require('express');
const app = express();
const PORT= 3001;
const airmonitor_router = require('./router/router')
const scheduler = require('./scheduler')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//local:3001 페이지 실행
app.use('/', airmonitor_router);

scheduler()

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));