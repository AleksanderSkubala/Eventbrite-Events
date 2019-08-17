const express = require('express');
const scrape = require('./js/scraper');
const makeScreen = require('./js/screen');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    let events = await scrape();
    res.send(events);
});

app.get('/screen', async (req, res) => {
    let screen = await makeScreen();
    let image = Buffer.from(screen, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': image.length
    });
    res.end(image);
});

app.listen(port, () => console.log("Server's listening on port: ", port));