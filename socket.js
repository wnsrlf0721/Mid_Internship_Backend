const SocketIO = require('socket.io');
const client = require('./mqtt/control');
const func = require('./IoT_function');
const con = require('./IoT_construct');
var IoT = require('./model');

// deviceId, label, categories 등 JSON에 반드시 포함되는 데이터를 수집하는 함수
function socket_data(parse){
    let send_socket = new Object();
    send_socket.deviceId=parse.deviceId;
    send_socket.label=parse.label;
    send_socket.categories=parse.categories;
    return send_socket;
}

function insert_db(send_socket,topic){
    if(topic === 'motion')
        var db = new IoT.Motion();
    else if(topic === 'bulb')
        var db = new IoT.Hue();
    else if(topic === 'air')
        var db = new IoT.Air();
    else if(topic === 'door')
        var db = new IoT.Door();
    else if(topic === 'plug')
        var db = new IoT.Plug();
        
    Object.keys(send_socket).forEach(element => {
        db[element] = send_socket[element];
    });
    //현재의 날짜를 가져온다
    var currentDate = new Date();
    
    // update_at 값을 현재의 날짜로 바꾼다
    db.updated_at = currentDate;
    
    // 만약 created_at이 존재하지 않는다면, 해당 값을 추가한다
    if (!db.created_at)
    	db.created_at = currentDate;
    db.save();
}

module.exports = (server)=>{
    const io = SocketIO(server, {cors: { origin: "*" }});
    io.on('connection',(socket)=>{
        console.log(socket.id, 'Connected');
        socket.emit('msg',`${socket.id} 연결 되었습니다.`);
        // device 정보 생성 (브라우저에 연결될때마다 초기화 -> 새로고침 시에도 적용 >> disconnect and connection )
        let bulb_arr= [new con.Bulb(),new con.Bulb()];
        let plug_arr= [new con.Plug(),new con.Plug()];
        let air= new con.Airmonitor();
        let door= new con.Doorsensor(); 
        let motion= new con.Motionsensor();
        
        //client에서 보내주는 msg 처리
        // {
        //     "commands": [
        //         {
        //             "component": "main",
        //             "capability": "switch",
        //             "command": "off",
        //             "arguments": [
        //             ]
        //         }
        //     ]
        // }
            //,
        //         {
        //             "component": "main",
        //             "capability": "colorControl",
        //             "command": "setHue",
        //             "arguments": [
        //                 80
        //             ]
        //         }
        //     ]
        // }

        //스마트플러그에 보내주는 data처리
        socket.on('plug/command', function (req) {
            client.publish('plug/update',JSON.stringify(req));
        });
        //HUE 전구에 보내주는 data처리
        socket.on('bulb/command', function (req) {
            client.publish('bulb/update',JSON.stringify(req));
        });

        //서버에서 client로 IoT정보값 전송
        client.on('message',function(topic,message){
            const parse = JSON.parse(message.toString());
            //hue plug 디바이스 서버에서 보내주는 message 처리
            if(topic=='bulb/sensor_status'){
                let read_bulb = func.read_bulb(parse,bulb_arr);
                for(let i=0;i<2;i++){
                    if(Object.keys(read_bulb[i]).length !== 0){
                        let send_socket = socket_data(parse[i]);
                        Object.assign(send_socket,read_bulb[i]);
                        //mongoose로 데이터 삽입
                        insert_db(send_socket, 'bulb');
                        socket.emit('bulb/sensor_status',JSON.stringify(send_socket));
                        console.log(send_socket);
                        // for(var key in send_socket){
                        //     var data_socket = send_socket[key];
                        //     console.log(`${key}: ${data_socket}`);
                        // }
                    }
                }
            }
        
            //Smartplug 디바이스 서버에서 보내주는 message 처리
            else if(topic=='plug/sensor_status'){
                let read_plug = func.read_plug(parse,plug_arr);
                for(let i=0;i<2;i++){
                    if(Object.keys(read_plug[i]).length !== 0){
                        let send_socket = socket_data(parse[i]);
                        Object.assign(send_socket,read_plug[i]);
                        //mongoose로 데이터 삽입
                        insert_db(send_socket,'plug');
                        socket.emit('plug/sensor_status',JSON.stringify(send_socket));
                        console.log(send_socket);
                    }
                }
            }
        
            //Air monitor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='airmonitor/sensor_status'){
                let read_air = func.read_air(parse,air);
                if(Object.keys(read_air).length !== 0){
                    let send_socket = socket_data(parse);
                    Object.assign(send_socket,read_air);
                    //mongoose로 데이터 삽입
                    insert_db(send_socket,'air');
                    socket.emit('airmonitor/sensor_status',JSON.stringify(send_socket));
                    console.log(send_socket);
                }
            }
        
            //Door sensor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='door/sensor_status'){
                let read_door = func.read_door(parse,door);
                if(Object.keys(read_door).length !== 0){
                    let send_socket = socket_data(parse);
                    Object.assign(send_socket,read_door);
                    //mongoose로 데이터 삽입
                    insert_db(send_socket,'door');
                    socket.emit('door/sensor_status',JSON.stringify(send_socket));
                    console.log(send_socket);
                }
            }
        
            //motion sensor 디바이스 서버에서 보내주는 message 처리
            else if(topic=='motion/sensor_status'){
                let read_motion = func.read_motion(parse,motion);
                if(Object.keys(read_motion).length !== 0){
                    let send_socket = socket_data(parse);
                    Object.assign(send_socket,read_motion);
                    //mongoose로 데이터 삽입
                    insert_db(send_socket, 'motion');
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