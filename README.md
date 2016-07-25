# EDF-imap-web

#### This repo contains private content held on behalf of EDF

EDF-imap-web is the HTML5 port of the EDF Interactive Map. Test it at:  
https://makemedialtd.github.io/EDF-imap-web/index.html


## Important files/folders

- index.html - open this in a browser to start the app
- assets/ - contains images, fonts and videos
- js/edf-imap-web.js - the main app logic, defines `window.EDF_IMAP_WEB`
- js/edf-imap-web.ts - source TypeScript file for js/edf-imap-web.js 
- js/content.js - defines the `window.EDF_IMAP_WEB.content` JSON object


## Using TypeScript

Compile and watch using:
`$ tsc -w js/*.ts --outFile js/eiw-app.js`
