# trackjs-dumpsterfire
Light up some LEDs when the TrackJS error rate goes over some threshold

## Enclosure/Hardware
Dumpster is from Thingiverse: https://www.thingiverse.com/thing:950602
Printed in translucent filament. Strip with 8 WS2812 LEDs placed inside. Mini breadboard with Particle Photon placed on the back of the dumpster. Some acrylic batting placed in the inside to diffuse the light.

For the Photon, it will be powered off USB. The LED strand should be powered off VIN/GND, and the data pin should be D3 to match the code provided.

Code for the fire effect is from FastLED examples https://github.com/FastLED/FastLED/blob/master/examples/Fire2012WithPalette/Fire2012WithPalette.ino

Code for the Particle is at `dumpsterfire.ino` Upload it to the Photon (you'll need to include the FastLED library on the app).

Update the USER SETTINGS constants at the top of the file with your TrackJS credentials.

You can test the function from the Particle Console.

## Webhook Integration
The device firmware publishes and subscribes to events to get the current error count. The webhook fetches and parses the error count from the TrackJS API, and returns it to hardware device. The webhook can be created with the [Particle Console](https://console.particle.io/integrations), or be executing this `curl` request with your access token:

```
$ curl -X POST "https://api.particle.io/v1/integrations?access_token=YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d "@webhook.json"
```
