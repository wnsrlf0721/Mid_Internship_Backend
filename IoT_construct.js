function Bulb(){
    this.sat = '';
    this.hue = '';
    this.switch = '';
}

function Plug(){
    this.power = '';
    this.energy = '';
    this.switch = '';
}

function Airmonitor(){
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

function Doorsensor(){
    this.contact = '';
    this.accelsensor = '';
    this.battery = '';
}

function Motionsensor(){
    this.motion = '';
    this.battery = '';
}

module.exports = {
    Bulb, Plug, Airmonitor, Doorsensor, Motionsensor
}