const SocketIO = require('socket.io');
const client = require('./mqtt/control');
const func = require('./IoT_function');
const con = require('./IoT_construct');

module.exports = (server)=>{
    const io = SocketIO(server, {cors: { origin: "*" }});
    io.on('connection',(socket)=>{
        console.log(socket.id, 'Connected');
        socket.emit('msg',`${socket.id} 연결 되었습니다.`);
        // device 정보 생성
        let bulb1 = new con.Bulb();
        let bulb2 = new con.Bulb();
        let bulb_arr= [bulb1,bulb2];
        let plug1= new con.Plug();
        let plug2= new con.Plug();
        let plug_arr= [plug1,plug2];
        let air= new con.Airmonitor();
        let door= new con.Doorsensor(); 
        let motion= new con.Motionsensor();
        
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
                let read_bulb = func.read_bulb(parse,bulb_arr);
                for(let i=0;i<2;i++){
                    if(Object.keys(read_bulb[i]).length !== 0){
                        let send_socket = new Object();
                        send_socket.deviceId=parse[i].deviceId;
                        send_socket.label=parse[i].label;
                        send_socket.categories=parse[i].categories; 
                        Object.assign(send_socket,read_bulb[i]);
                        socket.emit('bulb/sensor_status',JSON.stringify(send_socket));
                        console.log(send_socket);
                    }
                }
            }
        
            //Smartplug 디바이스 서버에서 보내주는 message 처리
            else if(topic=='plug/sensor_status'){
                let read_plug = func.read_plug(parse,plug_arr);
                for(let i=0;i<2;i++){
                    if(Object.keys(read_plug[i]).length !== 0){
                        let send_socket = new Object();
                        send_socket.deviceId=parse[i].deviceId;
                        send_socket.label=parse[i].label;
                        send_socket.categories=parse[i].categories; 
                        Object.assign(send_socket,read_plug[i]);
                        socket.emit('plug/sensor_status',JSON.stringify(send_socket));
                        console.log(send_socket);
                    }
                }
            }
        
            //Air monitor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='airmonitor/sensor_status'){
                let read_air = func.read_air(parse,air);
                if(Object.keys(read_air).length !== 0){
                    let send_socket = new Object();
                    send_socket.deviceId=parse.deviceId;
                    send_socket.label=parse.label;
                    send_socket.categories=parse.categories; 
                    Object.assign(send_socket,read_air);
                    socket.emit('airmonitor/sensor_status',JSON.stringify(send_socket));
                    console.log(send_socket);
                }
            }
        
            //Door sensor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='door/sensor_status'){
                let read_door = func.read_door(parse,door);
                if(Object.keys(read_door).length !== 0){
                    let send_socket = new Object();
                    send_socket.deviceId=parse.deviceId;
                    send_socket.label=parse.label;
                    send_socket.categories=parse.categories; 
                    Object.assign(send_socket,read_door);
                    socket.emit('door/sensor_status',JSON.stringify(send_socket));
                    console.log(send_socket);
                }
            }
        
            //motion sensor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='motion/sensor_status'){
                let read_motion = func.read_motion(parse,motion);
                if(Object.keys(read_motion).length !== 0){
                    let send_socket = new Object();
                    send_socket.deviceId=parse.deviceId;
                    send_socket.label=parse.label;
                    send_socket.categories=parse.categories; 
                    Object.assign(send_socket,read_motion);
                    socket.emit('motion/sensor_status',JSON.stringify(send_socket));
                    console.log(send_socket);
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