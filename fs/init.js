load('api_config.js');
load('api_gpio.js');
load('api_shadow.js');

let led = Cfg.get('board.led1.pin');  // Built-in LED GPIO number
let state = {on: false};              // Device state - LED on/off status

// Set up Shadow handler to synchronise device state with the shadow state
Shadow.addHandler(function(event, obj) {
  if (event === 'CONNECTED') {
    // Connected to shadow - report our current state.
    Shadow.update(0, state);
  } else if (event === 'UPDATE_DELTA') {
    // Got delta. Iterate over the delta keys, handle those we know about.
    for (let key in obj) {
      if (key === 'on') {
        // Shadow wants us to change local state - do it.
        state.on = obj.on;
        GPIO.set_mode(led, GPIO.MODE_OUTPUT);
        GPIO.write(led, state.on ? 1 : 0);
        print('LED on ->', state.on);
      } else {
        print('Dont know how to handle key', key);
      }
    }
    // Once we've done synchronising with the shadow, report our state.
    Shadow.update(0, state);
  }
});

// Demonstrate how to use shadow to periodically report metrics
load('api_timer.js');
load('api_sys.js');
Timer.set(5000, Timer.REPEAT, function() {
  Shadow.update(0, {uptime: Sys.uptime()});
}, null);
