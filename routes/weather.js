const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const scrapeBOM = require('../scraping/scrape_bom');
const scrapeACCU = require('../scraping/scrape_accu');
const Weather = require('../models/weather');

const BOM_URL = "http://www.bom.gov.au/nsw/forecasts/sydney.shtml";
const ACCU_URL = "https://www.accuweather.com/en/au/sydney/22889/daily-weather-forecast/22889";

router.get('/getURL/:url', async(req, res) => {
  let url;
  if(req.params.url === "bom.gov.au") {
    url = BOM_URL;
  } else if(req.params.url === "accuweather.com") {
    url = ACCU_URL;
  }
  const data = await checkLastUpdate(url);
  // console.log(data);
  res.json(data);
})
router.get('/getAll', async(req, res) => {
  checkLastUpdate(req.body.url);
})


async function scrape(url, update) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const createNewDocument = async (data) => {
    const weatherData = new Weather({
      site: url,
      data: data
    });
    try {
      await weatherData.save();
      console.log('New Weather Document created');
    } catch (error) {
      console.log(error);
    }
  }
  const findAndUpdate = async (data, url) => {
    try {
      await Weather.findOneAndUpdate(
        {site: url},
        {
          lastUpdated: Date.now(),
          data: data
        }
      );
      console.log('Updated Weather Dcoument');
    } catch (error) {
      console.log(error);
    }
  }
  if(url === BOM_URL) {
    await page.goto(url);
    const BOMData = await scrapeBOM.getData(page);
    browser.close();
    if(BOMData && !update) {
      // new
      await createNewDocument(BOMData);
      return(BOMData);
    } else if(BOMData && update) {
      // update
      await findAndUpdate(BOMData, url);
      return(BOMData);
    }
  } else if(url === ACCU_URL) {
    const ACCUData = await scrapeACCU.getData(page, url);
    browser.close();
    if(ACCUData && !update) {
      await createNewDocument(ACCUData);
      return(ACCUData);
    } else if(ACCUData && update) {
      await findAndUpdate(ACCUData, url);
      return(ACCUData);
    }
  }
  browser.close();
}

async function checkLastUpdate(url) {
  try {
    let update = false;
    [weatherData] = await Weather.find({site: url})
    if(weatherData) {
      if(Date.now() - weatherData.lastUpdated > 4000000) {
        // scrape data
        update = true;
        return(await scrape(url, update));
      } else {
        // get data from document
        console.log('Get Data from Document');
        return(weatherData.data);
      }
    } else {
      // make new document
      return(await scrape(url, update));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;