// 각 device 별 data 호출 함수 정의

//전구 데이타 호출
function read_bulb(parse,bulb_arr){
    let return_obj0 = new Object();
    let return_obj1 = new Object();
    let return_arr = [return_obj0,return_obj1];

    for(let i=0;i<2;i++){
        Object.keys(parse[i]).forEach(element => {
            if(bulb_arr[i][element]!=parse[i][element]){
                bulb_arr[i][element]=parse[i][element];
                return_arr[i][element]=bulb_arr[i][element];
            }
        });
    }
    return return_arr;
}

//스마트플러그 호출
function read_plug(parse,plug_arr){
    let return_obj0 = new Object();
    let return_obj1 = new Object();
    let return_arr = [return_obj0,return_obj1];
    
    for(let i=0;i<2;i++){
        Object.keys(parse[i]).forEach(element => {
            if(plug_arr[i][element]!=parse[i][element]){
                plug_arr[i][element]=parse[i][element];
                return_arr[i][element]=plug_arr[i][element];
            }
        });
    }
    return return_arr;
}

//에어모니터 호출
function read_air(parse,air){
    let return_obj = new Object();
    Object.keys(parse).forEach(element => {
        if(air[element]!=parse[element]){
            air[element]=parse[element];
            return_obj[element]=air[element];
        }
    });
    return return_obj;
}

//문열림센서 호출
function read_door(parse,door){
    let return_obj = new Object();
    Object.keys(parse).forEach(element => {
        if(door[element]!=parse[element]){
            door[element]=parse[element];
            return_obj[element]=door[element];
        }
    });
    return return_obj;
}

//모션센서 호출
function read_motion(parse,motion){
    let return_obj = new Object();
    Object.keys(parse).forEach(element => {
        if(motion[element]!=parse[element]){
            motion[element]=parse[element];
            return_obj[element]=motion[element];
        }
    });
    return return_obj;
}

module.exports ={
    read_bulb, read_plug, read_air, read_door, read_motion
}