// 각 device 별 data 호출 함수 정의

//전구 데이타 호출
function read_bulb(parse,bulb_arr){
    let return_obj0 = new Object();
    let return_obj1 = new Object();
    let return_arr = [return_obj0,return_obj1];

    for(let i=0;i<2;i++){
        // sat value
        if(bulb_arr[i].sat != parse[i].sat){
            bulb_arr[i].sat= parse[i].sat;
            return_arr[i].sat = bulb_arr[i].sat;
        }
        // hue value
        if(bulb_arr[i].hue!=parse[i].hue){
            bulb_arr[i].hue=parse[i].hue;
            return_arr[i].hue = bulb_arr[i].hue;
        }
        //switch value
        if(bulb_arr[i].switch!=parse[i].switch){
            bulb_arr[i].switch=parse[i].switch;
            return_arr[i].switch = bulb_arr[i].switch;
        }
    }
    return return_arr;
}

//스마트플러그 호출
function read_plug(parse,plug_arr){
    let return_obj0 = new Object();
    let return_obj1 = new Object();
    let return_arr = [return_obj0,return_obj1];
    
    for(let i=0;i<2;i++){
        //power value
        if(plug_arr[i].power!=parse[i].power){
            plug_arr[i].power = parse[i].power;
            return_arr[i].power = plug_arr[i].power;
        }
        //energy value
        if(plug_arr[i].energy!=parse[i].energy){
            plug_arr[i].energy = parse[i].energy;
            return_arr[i].energy = plug_arr[i].energy;
        }
        //switch value
        if(plug_arr[i].switch!=parse[i].switch){
            plug_arr[i].switch = parse[i].switch;
            return_arr[i].switch = plug_arr[i].switch;
        }
    }
    return return_arr;
}

//에어모니터 호출
function read_air(parse,air){
    let return_obj = new Object();
    //co2 data
    if(air.co2_measure!=parse.co2_measure){
        air.co2_measure=parse.co2_measure;
        return_obj.co2_measure = air.co2_measure;
    }
    if(air.co2_concern!= parse.co2_concern){
        air.co2_concern = parse.co2_concern;
        return_obj.co2_concern = air.co2_concern;
    }

    //dust data
    if(air.dust_measure!=parse.dust_measure){
        air.dust_measure=parse.dust_measure;
        return_obj.dust_measure = air.dust_measure;
    }
    if(air.dust_concern!=parse.dust_concern){
        air.dust_concern=parse.dust_concern;
        return_obj.dust_concern = air.dust_concern;
    }

    //fdust data
    if(air.fineDust_measure!= parse.fineDust_measure){
        air.fineDust_measure= parse.fineDust_measure;
        return_obj.fineDust_measure = air.fineDust_measure;
    }
    if(air.fineDust_concern!= parse.fineDust_concern){
        air.fineDust_concern= parse.fineDust_concern;
        return_obj.fineDust_concern = air.fineDust_concern;
    }

    //vfdust data
    if(air.veryfineDust_measure!= parse.veryfineDust_measure){
        air.veryfineDust_measure= parse.veryfineDust_measure;
        return_obj.veryfineDust_measure = air.veryfineDust_measure;
    }
    if(air.veryfineDust_concern!= parse.veryfineDust_concern){
        air.veryfineDust_concern= parse.veryfineDust_concern;
        return_obj.veryfineDust_concern = air.veryfineDust_concern;
    }

    //illu data
    if(air.illuminance!=parse.illuminance){
        air.illuminance=parse.illuminance;
        return_obj.illuminance = air.illuminance;
    }

    //humid data
    if(air.humidity!=parse.humidity){
        air.humidity=parse.humidity;
        return_obj.humidity = air.humidity;
    }

    //temperature data
    if(air.temperature!=parse.temperature){
        air.temperature=parse.temperature;
        return_obj.temperature =air.temperature;
    }

    //battery data
    if(air.battery!=parse.battery){
        air.battery=parse.battery;
        return_obj.battery = air.battery;
    }
    return return_obj;
}

//문열림센서 호출
function read_door(parse,door){
    let return_obj = new Object();
    //contact value
    if(door.contact!= parse.contact){
        door.contact= parse.contact;
        return_obj.contact = door.contact;
    }

    //acceleration value
    if(door.acceleration!= parse.acceleration){
        door.acceleration= parse.acceleration;
        return_obj.acceleration = door.acceleration;
    }

    //battery value
    if(door.battery!= parse.battery){
        door.battery= parse.battery;
        return_obj.battery = door.battery;
    }
    return return_obj;
}

//모션센서 호출
function read_motion(parse,motion){
    let return_obj = new Object();
    //motion value
    if(motion.motion!=parse.motion){
        motion.motion= parse.motion;
        return_obj.motion = motion.motion;
    }
    //battery value
    if(motion.battery!=parse.battery){
        motion.battery=parse.battery;
        return_obj.battery = motion.battery;
    }
    return return_obj;
}

module.exports ={
    read_bulb, read_plug, read_air, read_door, read_motion
}