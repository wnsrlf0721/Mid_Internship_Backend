
const con = require('./IoT_construct');
// device 정보 생성
let bulb1 = new con.bulb();
let bulb2 = new con.bulb();
let bulb_arr= [bulb1,bulb2];

let plug1= new con.plug();
let plug2= new con.plug();
let plug_arr= [plug1,plug2];

let air= new con.airmonitor();

let door= new con.doorsensor(); 

let motion= new con.motionsensor();

// 각 device 별 data 호출 함수
function read_bulb(parse){
    let return_arr = [];
    //sat & hue value's 상위components
    const color = [parse[0].colorControl,
    parse[1].colorControl];

    // sat value
    const sat = [color[0].saturation.value,
    color[1].saturation.value];
    if(bulb_arr[0].sat != sat[0]){
        bulb_arr[0].sat= sat[0];
        return_arr.push(`sat1: ${bulb_arr[0].sat}`);
    }
    if(bulb_arr[1].sat != sat[1]){
        bulb_arr[1].sat= sat[1];
        return_arr.push(`sat2: ${bulb_arr[1].sat}`);
    }

    // hue value
    const hue = [color[0].hue.value,
    color[1].hue.value];
    if(bulb_arr[0].hue!=hue[0]){
        bulb_arr[0].hue=hue[0];
        return_arr.push(`hue1: ${bulb_arr[0].hue}`);
    }
    if(bulb_arr[1].hue!=hue[1]){
        bulb_arr[1].hue=hue[1];
        return_arr.push(`hue2: ${bulb_arr[1].hue}`);
    }

    //switch value
    const swch = [parse[0].switch.switch.value,
    parse[1].switch.switch.value];
    if(bulb_arr[0].switch!=swch[0]){
        bulb_arr[0].switch=swch[0];
        return_arr.push(`on/off1: ${bulb_arr[0].switch}`);

    }
    if(bulb_arr[1].switch!=swch[1]){
        bulb_arr[1].switch=swch[1];
        return_arr.push(`on/off2: ${bulb_arr[1].switch}`);
    }
    return return_arr;
}

function read_plug(parse){
    let return_arr = [];
    //power 
    const power = [parse[0].powerMeter.power.value,
    parse[1].powerMeter.power.value];
    if(plug_arr[0].power!=power[0]){
        plug_arr[0].power=power[0]
        return_arr.push(`Power1: ${plug_arr[0].power}`);
    }
    if(plug_arr[1].power!=power[1]){
        plug_arr[1].power=power[1]
        return_arr.push(`Power2: ${plug_arr[1].power}`);
    }

    //energy
    const energy = [parse[0].energyMeter.energy.value,
    parse[1].energyMeter.energy.value];
    if(plug_arr[0].energy!=energy[0]){
        plug_arr[0].energy=energy[0]
        return_arr.push(`Energy1: ${plug_arr[0].energy}`);
    }
    if(plug_arr[1].energy!=energy[1]){
        plug_arr[1].energy=energy[1];
        return_arr.push(`Energy2: ${plug_arr[1].energy}`);
    }

    //swch
    const swch = [parse[0].switch.switch.value,
    parse[1].switch.switch.value];
    if(plug_arr[0].switch!=swch[0]){
        plug_arr[0].switch=swch[0];
        return_arr.push(`Switch1: ${plug_arr[0].switch}`);
    }
    if(plug_arr[1].switch!=swch[1]){
        plug_arr[1].switch=swch[1];
        return_arr.push(`Switch2: ${plug_arr[1].switch}`);
    }
    return return_arr;
}
function read_air(parse){
    let return_arr = [];

    //co2 data
    const co2_measure = parse.carbonDioxideMeasurement.carbonDioxide.value; //co2 value [0]
    const co2_concern = parse.carbonDioxideHealthConcern.carbonDioxideHealthConcern.value; 
    if(air.co2_measure!=co2_measure){
        air.co2_measure=co2_measure;
        return_arr.push(`Co2: ${air.co2_measure}`);
    }
    if(air.co2_concern!=co2_concern){
        air.co2_concern = co2_concern;
        return_arr.push(`>> ${air.co2_concern}`);
    }

    //dust data
    const dust_measure= parse.dustSensor.dustLevel.value; //먼지 [1]
    const dust_concern = parse.dustHealthConcern.dustHealthConcern.value; 
    if(air.dust_measure!=dust_measure){
        air.dust_measure=dust_measure;
        return_arr.push(`dust: ${air.dust_measure}`);
    }
    if(air.dust_concern!=dust_concern){
        air.dust_concern=dust_concern;
        return_arr.push(`>> ${air.dust_concern}`);
    }

    //fdust data
    const fineDust_measure = parse.dustSensor.fineDustLevel.value; //미세먼지 [2]
    const fineDust_concern = parse.fineDustHealthConcern.fineDustHealthConcern.value; 
    if(air.fineDust_measure!=fineDust_measure){
        air.fineDust_measure=fineDust_measure;
        return_arr.push(`fineDust: ${air.fineDust_measure}`);
    }
    if(air.fineDust_concern!=fineDust_concern){
        air.fineDust_concern=fineDust_concern;
        return_arr.push(`>> ${air.fineDust_concern}`);
    }

    //vfdust data
    const veryfineDust_measure =parse.veryFineDustSensor.veryFineDustLevel.value; //초미세먼지 [3]
    const veryfineDust_concern =parse.veryFineDustHealthConcern.veryFineDustHealthConcern.value; 
    if(air.veryfineDust_measure!=veryfineDust_measure){
        air.veryfineDust_measure=veryfineDust_measure;
        return_arr.push(`veryfineDust: ${air.veryfineDust_measure}`);
    }
    if(air.veryfineDust_concern!=veryfineDust_concern){
        air.veryfineDust_concern=veryfineDust_concern;
        return_arr.push(`>> ${air.veryfineDust_concern}`);
    }

    //illu data
    const illuminance = parse.illuminanceMeasurement.illuminance.value; //조도 [4]
    if(air.illuminance!=illuminance){
        air.illuminance=illuminance;
        return_arr.push(`조도: ${air.illuminance}`);
    }

    //humid data
    const humidity = parse.relativeHumidityMeasurement.humidity.value; //습도 [5]
    if(air.humidity!=humidity){
        air.humidity=humidity;
        return_arr.push(`습도: ${air.humidity}`);
    }

    //temperature data
    const temperature = parse.temperatureMeasurement.temperature.value; //온도 [6]
    if(air.temperature!=temperature){
        air.temperature=temperature;
        return_arr.push(`temperature: ${air.temperature}`);
    }

    //battery data
    const battery = parse.battery.battery.value; // 배터리 [7]
    if(air.battery!=battery){
        air.battery=battery;
        return_arr.push(`battery: ${air.battery}`);
    }
    return return_arr;
}

function read_door(parse){
    let return_arr = [];

    //contact value
    const contact = parse.contactSensor.contact.value;
    if(door.contact!= contact){
        door.contact=contact;
        return_arr.push(`door: ${door.contact}`);
    }

    //accel value
    const accelsensor = parse.accelerationSensor.acceleration.value;
    if(door.accelsensor!= accelsensor){
        door.accelsensor=accelsensor;
        return_arr.push(`accel motion: ${door.accelsensor}`);
    }

    //battery value
    const battery = parse.battery.battery.value;
    if(door.battery!= battery){
        door.battery=battery;
        return_arr.push(`battery: ${door.battery}`);
    }
    return return_arr;
}
function read_motion(parse){
    let return_arr = [];

    const mot = parse.motionSensor.motion.value;
    if(motion.motion!=mot){
        motion.motion=mot;
        return_arr.push(`motion: ${motion.motion}`);
    }

    const battery = parse.battery.battery.value;
    if(motion.battery!=battery){
        motion.battery=battery;
        return_arr.push(`battery: ${motion.battery}`);
    }
    return return_arr;
}

module.exports ={
    read_bulb, read_plug, read_air, read_door, read_motion, bulb_arr, plug_arr, air, door, motion
}