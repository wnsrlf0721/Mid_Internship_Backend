const SocketIO = require('socket.io');
const client = require('./mqtt/control');
const func = require('./IoT_function');
module.exports = (server)=>{
    const io = SocketIO(server, {cors: { origin: "*" }});
    io.on('connection',(socket)=>{
        console.log(socket.id, 'Connected');
        socket.emit('msg',`${socket.id} 연결 되었습니다.`);

        //client에서 보내주는 msg 처리
        socket.on('msg', function (data) {
            console.log(socket.id, data);
        });

        //서버에서 client로 msg 전송
        //제어 서버로부터 mqtt 메시지를 받는 상황
        client.on('message',function(topic,message){
            const parse = JSON.parse(message.toString());
            //hue plug 디바이스 서버에서 보내주는 message 처리
            if(topic=='bulb/sensor_status'){
                socket.emit('msg',func.read_bulb(parse));
            }
        
            //Smartplug 디바이스 서버에서 보내주는 message 처리
            else if(topic=='plug/sensor_status'){
                func.read_plug(parse);
            }
        
            //Air monitor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='airmonitor/sensor_status'){
                func.read_air(parse);
            }
        
            //Door sensor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='door/sensor_status'){
                func.read_door(parse);
            }
        
            //motion sensor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='motion/sensor_status'){
                func.read_motion(parse);
            }
        });
        
        //socket 연결 해제 시 처리
        socket.on('disconnect',()=>{
            console.log('클라이언트 접속 해제',socket.id);
            clearInterval(socket.interval);
        });

        //socket 통신 간 error 발생 시 처리
        socket.on('error',(error)=>{
            console.error(error);
        });
    })
}