const express = require('express');
const app = express();
const PORT = 3003;
const plug_router = require('./router/router')
const scheduler = require('./scheduler')

app.use(express.json());
app.use(express.urlencoded({extended:true}))

//local:3003 페이지 실행
app.use('/', plug_router);

scheduler()

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));