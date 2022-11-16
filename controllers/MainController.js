const City = require('../model/City.js');
const Predicted_Weather = require('../model/Predicted_Weather.js');
const Weathers = require('../model/Weathers.js');
const sequelize = require("../config/dbConnect.js");
const puppeteer = require('puppeteer');



exports.getIndex = (req, res) => {

    res.render('index.ejs', { value: "Bir şehir arayın veya haritadan seçin.", city: "" });
};


exports.getCity = async (req, res) => {
    const control = await controlCity(req.params.city)
    res.render('index.ejs', control);

}



const controlCity = async (cityStub) => {
    try {
        const city = await City.findAll({ where: { SEHIRSTUB: cityStub } });
        if (city.length === 0) {  // when it comes here it works
            return { value: "Bu şehir veritabanımızda bulunmamaktadır.", city: { SEHIRSTUB: "" } };
        }
        return controlPredictedWeather(city[0]);
    } catch (err) {
        console.log(err);
    }
};

const controlPredictedWeather = async (city) => {
    try {
        const degree = await Predicted_Weather.findAll({ where: { CITYID: city.ID } });
        if (degree.length === 0) {
            return (getPredictedWeather(city));
        }
        return { value: degree[0].DEGREE, city: city };
    } catch (err) {
        console.log(err)
    }
};

const getPredictedWeather = async city => {

    try {
        let tdValue = [];
        for (let i = 6; i > 0; i--) {

            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear() - i;
            const fullDate = year + '-' + month + '-' + day
            console.log(fullDate);
            const url = `https://www.wunderground.com/history/daily/${city.WUCODE}/date/${fullDate}`;
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle2'] });
            await page.waitForSelector("#inner-content > div.region-content-main > div.row > div:nth-child(3) > div:nth-child(1) > div > lib-city-history-summary > div > div.summary-table > table > tbody:nth-child(2)");
            let value = await page.evaluate(() => {
                let degree = document.querySelector("#inner-content > div.region-content-main > div.row > div:nth-child(3) > div:nth-child(1) > div > lib-city-history-summary > div > div.summary-table > table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(2)").innerHTML;
                return degree;
            });
            await page.close();
            console.log(value);
            tdValue.push({ value: value, date: fullDate })
            await browser.close();

        }
        console.log(tdValue);
        return insertDataToDB(tdValue, city);
    }
    catch (err) {
        console.log(err);
    }
}

const insertDataToDB = async (value, city) => {
    try {
        await value.forEach(async (item) => {
            await Weathers.create({
                CITYID: city.ID,
                DEGREE: item.value,
                DATE: item.date,
            })});
        return predictWeather(value,city);
    }
    catch (err) {
        console.log(err);
    }

}

const predictWeather = async (value, city) => {

    try {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        const dayMonth = month + "-" + day;
        const value = await sequelize.query(`SELECT AVG("DEGREE") FROM "WEATHERS" WHERE "CITYID" = ${city.ID} AND "DATE" LIKE  '%${dayMonth}'`)
        console.log(value);


    }
    catch (err) {
        console.log(err);
    }
}