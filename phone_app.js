const express = require('express') // already there
const app = express() // already there
const https = require('https') // added
const fs = require('fs') // added
const port = 6969
const path = require('path');

app.use(express.static('phone_assets'));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/phone_assets/index.html'));
// })

// added following block
const httpsOptions = {
    key: fs.readFileSync('./test/maincontroller-imitator/security/cert.key'),
    cert: fs.readFileSync('./test/maincontroller-imitator/security/cert.pem')
}


const server = https.createServer(httpsOptions, app)
    .listen(port, () => {
        console.log('server running at ' + port)
    })
