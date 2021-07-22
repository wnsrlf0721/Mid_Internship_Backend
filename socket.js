const SocketIO = require('socket.io');
const client = require('./mqtt/control');
const func = require('./IoT_function');
const con = require('./IoT_construct');

module.exports = (server)=>{
    const io = SocketIO(server, {cors: { origin: "*" }});
    io.on('connection',(socket)=>{
        console.log(socket.id, 'Connected');
        socket.emit('msg',`${socket.id} 연결 되었습니다.`);
        func.bulb_arr = [new con.bulb(),new con.bulb()]
        func.plug_arr = [new con.plug(),new con.plug()]
        func.air= new con.airmonitor();
        func.door= new con.doorsensor(); 
        func.motion= new con.motionsensor();
        
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
                let read_bulb = func.read_bulb(parse);
                if(read_bulb.length !== 0){
                    socket.emit('msg',read_bulb);
                    console.log(read_bulb);
                }
            }
        
            //Smartplug 디바이스 서버에서 보내주는 message 처리
            else if(topic=='plug/sensor_status'){
                let read_plug = func.read_plug(parse);
                if(read_plug.length !== 0){
                    socket.emit('msg',read_plug);
                    console.log(read_plug);
                }
            }
        
            //Air monitor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='airmonitor/sensor_status'){
                let read_air = func.read_air(parse);
                if(read_air.length !== 0){
                    socket.emit('msg',read_air);
                    console.log(read_air);
                }
            }
        
            //Door sensor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='door/sensor_status'){
                let read_door = func.read_door(parse);
                if(read_door.length !== 0){
                    socket.emit('msg',read_door);
                    console.log(read_door);
                }
            }
        
            //motion sensor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='motion/sensor_status'){
                let read_motion = func.read_motion(parse);
                if(read_motion.length !== 0){
                    console.log(read_motion);
                    socket.emit('msg',read_motion);
                }
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