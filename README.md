# EDF-imap-web

#### This repo contains private content held on behalf of EDF Energy plc

EDF-imap-web is the HTML5 port of the EDF Interactive Map. Test it at:  
https://makemedialtd.github.io/EDF-imap-web/iframe-test.html  
https://makemedialtd.github.io/EDF-imap-web/index.html  


## Important files/folders

- __index.html__ - open this file in a browser to start the app
- __assets/__ - contains images, fonts and videos
- __css/eiw-style.css__ - app styling (not including CSS for 3rd-party plugins)
- __js/edf-app.js__ - the main app logic, instantiates `window.EDF_IMAP_WEB.app`
- __js/edf-main.ts__ - source for the ‘Main’ class. Compiles to js/edf-app.js 
- __js/edf-pin.ts__ - source for ‘Pin’ classes. Also compiles to js/edf-app.js 
- __js/edf-content.js__ - configures the app, and adds each Pin instance


## Compiling EDF-imap-web

Compile and watch using:  
`$ npm start`  
(you’ll need `tsc` installed)
