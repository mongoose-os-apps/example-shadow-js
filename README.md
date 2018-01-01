# Mongoose OS device shadow demo - JavaScript

This is the Mongoose OS demo app that demonstrates how to use device
shadow to control devices. It implements a simple switch on/off logic,
and allows to switch an LED on or off using a shadow. Also it shows how
to use shadow to report stats metrics.

Note that Mongoose OS shadow implementation is cross-cloud. It works the same
way on
[Mongoose OS device management dashboard](https://dash.mongoose-os.com/#/),
[AWS IoT](https://aws.amazon.com/iot/). Support for
[Google IoT core](https://cloud.google.com/iot-core/) is coming soon.
You can switch between clouds without changing your device logic, and it'll
continue to work.

See `fs/init.js` file for the idiomatic usage of shadow objects.
