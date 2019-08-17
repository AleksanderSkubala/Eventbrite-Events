const puppeteer = require('puppeteer');
const sendMail = require('./send-mail'); //working example in send-mail-example.js

//this function is cutting elements that are repeating(are in only mobile version)
const split = (collection) => {
    let arr = Array.from(collection);
    let newArr = [];
    for(let i=0; i < (arr.length/2); i++) {
        if(arr[i].includes('Laravel')) {
            console.log('there it is!!!');
            sendMail();
        }
        newArr.push(arr[i]);
    }

    return newArr;
};

const scrape = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://www.eventbrite.com/d/poland--pozna%C5%84/free--science-and-tech--events/?page=1');
    await page.setViewport({width: 1920, height: 1080})

    const selector = '.eds-event-card__formatted-name--is-clamped';
    await page.waitForSelector(selector);

    let events = await page.evaluate(selector => {
        const anchors = Array.from(document.querySelectorAll(selector));
        return anchors.map(event => {
            return event.innerText;
        });
    }, selector);
    events = split(events);

    await browser.close();
    console.log(events);
    return events;
};

module.exports = scrape;