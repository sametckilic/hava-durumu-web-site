const axios = require('axios');
const cheerio = require('cheerio');
const {JSDOM} = require('jsdom');
const puppeteer = require('puppeteer');


async function samet(){

const url = `https://www.wunderground.com/history/daily/LTAC/date/2016-11-13`

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto(url,{waitUntil:'networkidle2'});

let data = await page.evaluate(() => {

    let degree = document.querySelector("#inner-content > div.region-content-main > div.row > div:nth-child(3) > div:nth-child(1) > div > lib-city-history-summary > div > div.summary-table > table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)").innerHTML;

    return degree;

});
console.log(data);

await browser.close();

}
samet();