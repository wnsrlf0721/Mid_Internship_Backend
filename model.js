const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/IoTDB', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', function(){
    console.log('Connection Failed!');
});
db.once('open', function() {
    console.log('Connected!');
});
var Schema = mongoose.Schema;
//IoT data정보
const airSchema = new Schema({
  deviceId: { type: String, required: true },
  label: { type: String, required: true },
  categories: {type: String, required: true},
  created_at: Date,
  updated_at: Date,
  co2_measure: Number,
  co2_concern: String,
  dust_measure: Number,
  dust_concern: String,
  fineDust_measure: Number,
  fineDust_concern: String,
  veryfineDust_measure: Number,
  veryfineDust_concern: String,
  illuminance: Number,
  humidity: Number,
  temperature: Number,
  battery: Number
});
const doorSchema = new Schema({
  deviceId: { type: String, required: true },
  label: { type: String, required: true },
  categories: {type: String, required: true},
  created_at: Date,
  updated_at: Date,
  contact: String,
  acceleration: String,
  battery: Number
});
const hueSchema = new Schema({
  deviceId: { type: String, required: true },
  label: { type: String, required: true },
  categories: {type: String, required: true},
  created_at: Date,
  updated_at: Date,
  sat: Number,
  hue: Number,
  switch: String
});
const motionSchema = new Schema({
  deviceId: { type: String, required: true },
  label: { type: String, required: true },
  categories: {type: String, required: true},
  created_at: Date,
  updated_at: Date,
  motion: String,
  battery: Number
});
const plugSchema = new Schema({
  deviceId: { type: String, required: true },
  label: { type: String, required: true },
  categories: {type: String, required: true},
  created_at: Date,
  updated_at: Date,
  energy: Number,
  switch: String
});

var Air = mongoose.model('Air',airSchema, 'Air_data');
var Door = mongoose.model('Door',doorSchema, 'Door_data');
var Hue = mongoose.model('Hue',hueSchema, 'Hue_data');
var Motion = mongoose.model('Motion',motionSchema, 'Motion_data');
var Plug = mongoose.model('Plug',plugSchema, 'Plug_data');

module.exports = {
  Air, Door, Hue, Motion, Plug
}