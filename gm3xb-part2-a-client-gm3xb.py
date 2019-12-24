import sys
import select
import socket
# randomly take some buffer size and port number
name_host = '10.151.1.146'
size_buffer = 1024
port_no = 8080
if __name__ == "__main__":
    soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    #checking the connection of the system
    try:
        soc.connect((name_host, port_no))
    except:
        print ('The connection for the system is not available to proceed!!!!')
        sys.exit()

    print ('Your connection is ready now....')
    #Checking the data connection
    while True:
        Listsocket = [sys.stdin, soc]
        readings, _ , _ = select.select(Listsocket, [], [])

        for socket in readings:
            if socket == soc:
                data_rec = socket.recv(size_buffer)
                if not data_rec:
                    print ('\nNo data received and disconnected from the server!!!!')
                    sys.exit()
                elif data_rec.decode() =="exit":
                    print ("And the connection got closed!!!!!")
                    sys.exit()
                else:
                    print(data_rec.decode())
            else:
                #User giving the message
                msg = input()
                soc.send(msg.encode("utf8"))

soc.close()

    
