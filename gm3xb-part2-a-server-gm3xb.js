var net = require('net');
var server = net.createServer();
server.on('connection', handleConnection);
server.listen(8080,'10.151.1.146', function() {
  console.log('Your server is now listening to %j', server.address());
});
server.maxConnections = 1;
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
    if (d == "exit")
    {
      c.write(d);
      server.close();
    }
 }

function onConnClose() 
 {
    console.log('Your connection from the client %s closed', Addr);
 }

function onConnError(e) 
 {
  console.log('There is an error %s connection: %s', Addr, e.message);
 }
}
