function Bulb(){
    this.deviceId = '';
    this.label = '';
    this.categories = '';
    this.sat = '';
    this.hue = '';
    this.switch = '';
}

function Plug(){
    this.deviceId = '';
    this.label = '';
    this.categories = '';
    this.power = '';
    this.energy = '';
    this.switch = '';
}

function Airmonitor(){
    this.deviceId = '';
    this.label = '';
    this.categories = '';
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
    this.deviceId = '';
    this.label = '';
    this.categories = '';
    this.contact = '';
    this.accelsensor = '';
    this.battery = '';
}

function Motionsensor(){
    this.deviceId = '';
    this.label = '';
    this.categories = '';
    this.motion = '';
    this.battery = '';
}

module.exports = {
    Bulb, Plug, Airmonitor, Doorsensor, Motionsensor
}