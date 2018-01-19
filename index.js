var Service;
var Characteristic;

var sys = require('sys');
    exec = require('child_process').exec;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-S7', 'S7', S7Accessory);
}

function puts(error, stdout, stderr) {
   console.log(stdout)
}

function S7Accessory(log, config) {
  this.log = log;
  this.service = 'Switch';

  this.name = config['name'];
  this.onValue = config['on_value'];
  this.onValue = this.onValue.trim().toLowerCase();
  this.ip = config['ip'];
  this.operator = config['operator'];    
  }  

S7Accessory.prototype.setState = function(powerOn, callback) {
  var accessory = this;
  var state = powerOn ? 'on' : 'off';
  var ip = this.ip;
  var operator = this.operator;
    
    console.log (state)
    
    if (state == 'on') {
        var value = 'ON';
    }
    else if (state == 'off') {
        var value = 'OFF';
    }
    else {
        var value = 'ERROR';
    }
    

    exec('python /usr/local/lib/node_modules/homebridge-s7/S7.py' +' '+ ip +' '+ operator +' '+ value);
    console.log (ip +' '+ operator +' '+ value)
    accessory.log('Set ' + accessory.name + ' to ' + state);
    callback(null);
}

S7Accessory.prototype.getState = function(callback) {
  var accessory = this;
 // var command = accessory['stateCommand'];
  var stdout = "none";  
  
  if (this.fileState) {
    var flagFile = fileExists.sync(this.fileState);
    accessory.log('State of ' + accessory.name + ' is: ' + flagFile);
    callback(null, flagFile);
  }
  else {
    exec('python /usr/local/lib/node_modules/homebridge-s7/S7.py'  +' '+ ip +' '+ operator +' '+ 'STATE', function (error, stdout, stderr) {
      var cleanOut=stdout.trim().toLowerCase();
      accessory.log('State of ' + accessory.name + ' is: ' + cleanOut);
      callback(null, cleanOut == accessory.onValue);
    });
  }
}

S7Accessory.prototype.getServices = function() {
  var informationService = new Service.AccessoryInformation();
  var switchService = new Service.Switch(this.name);

  informationService
  .setCharacteristic(Characteristic.Manufacturer, 'S7 Manufacturer')
  .setCharacteristic(Characteristic.Model, 'S7 Model')
  .setCharacteristic(Characteristic.SerialNumber, 'S7 Serial Number');

  var characteristic = switchService.getCharacteristic(Characteristic.On)
  .on('set', this.setState.bind(this));

  if (this.stateCommand || this.fileState) {
    characteristic.on('get', this.getState.bind(this))
  };

  return [switchService];
}
