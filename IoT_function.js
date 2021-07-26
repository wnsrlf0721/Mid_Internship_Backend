// 각 device 별 data 호출 함수 정의
function push_data(obj,parse,arr){
    Object.keys(parse).forEach(element=>{
        if(obj[element]!=parse[element]){
            obj[element]=parse[element];
            arr[element]=obj[element];
        }
    })
}

//전구 데이타 호출
function read_bulb(parse,bulb_arr){
    let return_arr = [new Object(),new Object()];
    for(let i=0;i<2;i++){
        push_data(bulb_arr[i],parse[i],return_arr[i]);
    }
    return return_arr;
}

//스마트플러그 호출
function read_plug(parse,plug_arr){
    let return_arr = [new Object(),new Object()];
    for(let i=0;i<2;i++){
        push_data(plug_arr[i],parse[i],return_arr[i]);
    }
    return return_arr;
}

//에어모니터 호출
function read_air(parse,air){
    let return_obj = new Object();
    push_data(air,parse,return_obj);
    return return_obj;
}

//문열림센서 호출
function read_door(parse,door){
    let return_obj = new Object();
    push_data(door,parse,return_obj);
    return return_obj;
}

//모션센서 호출
function read_motion(parse,motion){
    let return_obj = new Object();
    push_data(motion,parse,return_obj);
    return return_obj;
}

module.exports ={
    read_bulb, read_plug, read_air, read_door, read_motion
}