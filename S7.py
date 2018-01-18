#!/usr/bin/python

#Script zum Einschalten des Operators

import S71200
from time import sleep
import snap7
from snap7.util import *
import struct
import sys

#IP-Adresse einlesen
ip = sys.argv[1]
print ip

#Operator einlesen
operator = sys.argv[2]
print operator

#value einlesen
value = sys.argv[3]
print value

#Mit der SPS verbinden
plc = S71200.S71200(ip)

#Operator auf value setzen
plc.writeMem(operator, value)

#Operator Status
state = plc.getMem(operator)
print state
plc.plc.disconnect()
