const City = require('../model/City.js');
const Predicted_Weather = require('../model/Predicted_Weather.js');

const axios = require('axios');
const cheerio = require('cheerio');


exports.getIndex = (req, res) => {

    res.render('index.ejs',{value: 31});
};


exports.getCity = async (req, res) => {
    const control = await controlCity(req.params.city);
    console.log(control);

    res.render('index.ejs', {value: 31});
}



const controlCity =  (cityStub) => {
    City.findAll({ where: { SEHIRSTUB: cityStub } })
        .then(
            city => {
                if (city.length === 0) {
                    console.log("Bu şehir veritabanımızda bulunumuyor...");
                    return "Bu şehir veritabanımızda bulunumuyor...";
                }
                else {
                    return {value:31};
                    // return controlPredictedWeather(city[0]);
                }

            }).catch(err => console.log(err));

}
const controlPredictedWeather = (city) => {
    Predicted_Weather.findAll({ where: { CITYID: city.ID } }).then(
        degree => {
            if (degree.length === 0) {
                return getPredictedWeather(city);
            }
            else {
                return {value: degree[0].degree, city: city};
            }
        }
    ).catch(err => console.log(err))

}

const getPredictedWeather = (city) =>{

    axios.get(`https://www.wunderground.com/history/daily/${city.WUCODE}/date/2020-1-1`)
        .then(res => {
            const htmlData = res.data;
            const $ = cheerio.load(htmlData);
            const elementSelector = "#inner-content > div.region-content-top > lib-city-header > div:nth-child(1) > div > div > a.station-name > lib-display-unit > span > span.wu-value.wu-value-to";
            $(elementSelector).each((parentIdx, parentElm) =>{
                var tdValue = $(parentElm).text()
                tdValue = Math.ceil((Number(tdValue)-32)*(5/9));
                console.log(tdValue);
                return insertDataToDB(tdValue,city);
            });

        }).catch(err => console.log(err));

}


const insertDataToDB = (value,city) =>{

    Predicted_Weather.create({
        CITYID: city.ID,
        DEGREE: value
    })

    return {value: value, city: city};

}