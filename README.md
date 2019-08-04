# trackjs-dumpsterfire
Light up some LEDs when the TrackJS rate goes over some threshhold

## Enclosure/Hardware
Dumpster is from Thingiverse: https://www.thingiverse.com/thing:950602
Printed in translucent filament. Strip with 8 WS2812 LEDs placed inside. Mini breadboard with Particle Photon placed on the back of the dumpster. Some acrylic batting placed in the inside to diffuse the light.

For the Photon, it will be powered off USB. The LED strand should be powered off VIN/GND, and the data pin should be D3 to match the code provided.

Code for the fire effect is from FastLED examples https://github.com/FastLED/FastLED/blob/master/examples/Fire2012WithPalette/Fire2012WithPalette.ino

Code for the Particle is at `dumpsterfire.ino` Upload it to the Photon (you'll need to include the FastLED library on the app).

You can test the function from the Particle Console.

## Link TrackJS and your hardware
Copy the keysTEMP.js and name it keys.js. Fill in the information with the TrackJS and Particle API info.

Run NPM install to get the luxon library in. 

If you want to test the function outside of lambda, comment out the `exports.handler` line and the other bracket and run it with `node index.js`

Copy the entire folder, and delete the `git` folder, `.gitignore`, `dumpsterfire.ino`, `keysTEMP.js`, both `package-lock.json` and `package.json` and `README.md` files and folders. You should just have the `node_modules` folder, and the `index.js`, and `keys.js`files. 

Zip up the folder, create the lambda function, author from scratch with the Node.js runtime and default permissions. From `Code entry type`, select `Upload a .zip file` and select the zip file you created. It will create everything nested inside a folder, you'll need to click and drag the folder and files to be right under the parent directory. Be sure the `Handler` says `index.handler`. Save it.

Go to CloudWatch in AWS. Click Events / Rules, and create a rule. Select Schedule, then set a fixed rate of 5 minutes. Add a target, select Lambda Function, then select the lambda function you just added. Click "Configure Details", add a name, then click "Create Rule". 

If you want to test it, you can change your threshhold to be high. Or you can turn the light on or off from the Particle Console, and see the scheduled task turn it on or off.