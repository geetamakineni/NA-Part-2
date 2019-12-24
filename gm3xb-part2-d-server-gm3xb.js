var net = require('net');
var sockets = [];
var server = net.createServer(function(socket)
{
sockets.push(socket);
});
server.on('connection', handleConnection);
server.listen(8080,'10.205.1.170', function() 
{
  console.log('Your server is now listening to %j', server.address());
});
function handleConnection(c)
 {  
  var Addr = c.remoteAddress + ':' + c.remotePort;
  console.log('You have a new client connection from the ipaddress %s', Addr);
  c.setEncoding('utf8');
  c.on('data', onConnData);
  c.once('close', onConnClose);
  c.on('error', onConnError);

function onConnData(d)
 {
    console.log('You are getting data from %s: %j', Addr, d);
    for (var i = 0; i < sockets.length; i++)
	{
            if (sockets[i] === c) continue;
            sockets[i].write(d.toString());
        }
  }

function onConnClose()
 {
    console.log('Your connection from the client %s closed', Addr);
  }

function onConnError(e)
 {
  console.log('Error %s connection: %s', Addr, e.message);
  }
}
