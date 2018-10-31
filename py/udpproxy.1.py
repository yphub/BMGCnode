import socket
from pymavlink import mavutil
from json import loads
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind(("0.0.0.0", 6000))

master = mavutil.mavlink_connection('udp:0.0.0.0:14552')

master.wait_heartbeat()
print('get heartbeat')

while True:
    data, addr = s.recvfrom(1024)
    try:
        # print(data['args'])
        data = loads(data)
        method = data['type'] + '_send'

        if hasattr(master.mav, method):
            func = getattr(master.mav, method)
            if hasattr(func, '__call__'):
                func(*data['args'])
            else:
                print(method + ' is not callable!')
        else:
            print('Cannot find method ' + method + '!')        
    except Exception as e:
        print(e)
