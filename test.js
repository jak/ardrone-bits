var arDrone = require('ar-drone');
var http = require('http');
var client = arDrone.createClient();
var exiting = false;

process.on('SIGINT', function() {
        if (exiting) {
            process.exit(0);
        } else {
            console.log('Got SIGINT. Landing, press Control-C again to force exit.');
            exiting = true;
            client.stop();
            client.land();
            console.log("Landing drone.");
       }
    });
// client.config('general:navdata_demo', 'FALSE');
// client.on('navdata', console.log);
client.on('batteryChange', console.log);
client.config('control:altitude_max', 2000);

client.takeoff();
client
  .after(5000, function() {
    this.up(1);
  })
  .after(5000, function() {
    this.stop();
  })
  .after(1000, function() {
    this.clockwise(1);
  })
  .after(2000, function() {
    this.counterClockwise(1)
  })
  .after(2000, function() {
    this.stop();
  })
  .after(2000, function () {
    this.land();
  });
