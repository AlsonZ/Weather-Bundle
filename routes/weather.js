const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
// import scrapeBOM from '../scraping/scrape_bom';
const scrapeBOM = require('../scraping/scrape_bom');
// const Weather = require('../models/weather');


router.get('/getUrl:name', async(req, res) => {
  const data = checkLastUpdate(req.body.url);
  res.json(data);
})
router.get('/getAll', async(req, res) => {
  checkLastUpdate(req.body.url);
})


async function scrape(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const BOMdata = await scrapeBOM.getData(page);
  console.log(BOMdata);
  browser.close();
  return(BOMdata);
}
// scrape('http://www.bom.gov.au/nsw/forecasts/sydney.shtml');

async function checkLastUpdate(url) {
  // check database document to see if date.now > previous by 1 hour
  // possibly use the document which holds the specific site data to 
  // store the oneHourPassedBy
  const oneHourPassedBy = true; // calculate if one hour passed by
  const updating = false;
  if((oneHourPassedBy || oneHourPassedBy === null) && !updating) {
    // scrape data
    scrape(url);
  } else {
    // get data from database document
  }
}
