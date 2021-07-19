function bulb(){
    this.sat = '';
    this.hue = '';
    this.switch = '';
}

function plug(){
    this.power = '';
    this.energy = '';
    this.switch = '';
}

function airmonitor(){
    this.co2_measure = '';
    this.co2_concern = '';

    this.dust_measure = '';
    this.dust_concern = '';

    this.fineDust_measure = '';
    this.fineDust_concern = '';

    this.veryfineDust_measure = '';
    this.veryfineDust_concern = '';

    this.illuminance = '';
    this.humidity = '';
    this.temperature = '';
    this.battery = '';
}

function doorsensor(){
    this.contact = '';
    this.accelsensor = '';
    this.battery = '';
}

function motionsensor(){
    this.motion = '';
    this.battery = '';
}

module.exports = {
    bulb, plug, airmonitor, doorsensor, motionsensor
}