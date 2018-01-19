homebridge-S7
==============

Use a Siemens S7 PLC for switch on whatever you want.

The plugin that this one is based on: [homebridge-script2](https://github.com/pponce/homebridge-script2).
Original plugin: [homebridge-script](https://github.com/xxcombat/homebridge-script).
Script to make it easier: [S71200.py](https://github.com/SimplyAutomationized/raspberrypi/raw/master/S7-1200pi/S71200.py)

## Installation
(Requires node >=6.0.0)

1. Install homebridge using: `npm install -g homebridge`
2. Install homebridge-S7 using: `sudo npm install -g homebridge-S7`
3. Install snap7 with this guide: http://simplyautomationized.blogspot.de/2014/12/raspberry-pi-getting-data-from-s7-1200.html
4. Update your configuration file with code like the sample below

Homebridge-S7 configuration parameters

Name | Value | Required | Notes
----------- | ------- | --------- | --------------
`accessory` | "S7" | yes | Must be set to "S7" and is required
`name` | _(custom)_ | yes | Name of accessory that will appear in homekit app and is required
`on_value` | _(custom)_ | no (see note) | Used in conjunction with the state script. If using the state script this is the value that will be used to match against the state script output. If this value matches the output, then the accessory will be determined to be on.
`ip` | "192.168.178.2" | yes | Must be set to the IP of your S71200 PLC and is required
`operator` | "MX0.0/QX0.0" | yes | Must be set to the operator you want to control. You can directly control an Output of the PLC if the Output isn't used in your PLC program. Or you can control a memory bit and use it as a virtual input to create your own logic code in the PLC.

## Configuration

```
"accessories": [
	{
              "accessory": "S7",
              "name": "Living room light",
              "on_value" : "True",
              "ip" : "192.168.178.2",
              "operator" : "MX100.0"
	}
]
```
#### Notes
##### Using the above configuration as an example:
- The on_value is used to match against the state script output. If the value matches the output of the state script the accessory is determined to be on.
- The ip has to be set to the IP of your PLC
- The operator can be set to any QX Output of your PLC or to every MX Memory bit.
