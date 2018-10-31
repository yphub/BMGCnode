import getopt
import sys
from pymavlink import mavutil
from json import loads


def parseArg():
    res = {
        'mavlinkport': '14552'
    }
    try:
        opts, args = getopt.getopt(sys.argv[1:], "hm:", [
            "help", "mavlinkport="])
    except getopt.GetoptError:
        print("get opt error")
        return res
    for key, val in opts:        
        if key in ('-m', '--mavlinkport'):
            res['mavlinkport'] = val
    return res


res = parseArg()

print("Args parsed. Start Listening to udp")

# master = mavutil.mavlink_connection('udp:0.0.0.0:' + res['mavlinkport'])

# master.wait_heartbeat()
# print('get heartbeat')

while True:
    data = input()
    try:
        # print(data['args'])
        data = loads(data)
        method = data['type'] + '_send'

        print('receive data type: ' + data['type'])

        # if hasattr(master.mav, method):
        #     func = getattr(master.mav, method)
        #     if hasattr(func, '__call__'):
        #         func(*data['args'])
        #     else:
        #         print(method + ' is not callable!')
        # else:
        #     print('Cannot find method ' + method + '!')
    except Exception as e:
        print(e)
