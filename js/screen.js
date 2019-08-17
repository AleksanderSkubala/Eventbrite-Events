const puppeteer = require('puppeteer');

const screen = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.eventbrite.com/d/poland--pozna%C5%84/free--science-and-tech--events/?page=1');
    await page.setViewport({width: 1920, height: 1080})
    const img = await page.screenshot({encoding: 'base64'})

    await browser.close();

    return img;
};

module.exports = screen;