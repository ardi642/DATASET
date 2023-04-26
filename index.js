import puppeteer from "puppeteer-core";
import dotenv from "dotenv";
import fs from "fs";
const wsEndpoint = dotenv.config().parsed.WS_ENDPOINT;
const browser = await puppeteer.connect({
  browserWSEndpoint: wsEndpoint,
  defaultViewport: null
});
let response, __NEXT_DATA__, data;
let url, raw_data, tanggal;

const page = await browser.newPage();
await page.goto('https://www.99.co/id/jual/rumah/yogyakarta?tipe_pasar=primary');

global.browser = browser;
global.page = page;

const list = await page.$$('.ui-molecules-secondary-card--listing-reguler')
const links = [];
await Promise.all(list.map(async (item) => {
  const link = await item.$eval('.ui-molecules-secondary-card__link', el => el.getAttribute('href'));
  links.push(link);
  
}))

response = await page.goto(links[0])
// __NEXT_DATA__ = await page.evaluate(() => {return __NEXT_DATA__ })
__NEXT_DATA__ = await page.$eval('#__NEXT_DATA__', el => {
  const jsonText = el.textContent;
  return JSON.parse(jsonText);
})
data = __NEXT_DATA__.props.pageProps.data;
raw_data = JSON.stringify(data);
raw_data = raw_data.replace(/:""/g, `:"_KOSONG_"`)
tanggal = Date();
url = page.url();

const writeStream = fs.createWriteStream('raw-data.csv', {flags: 'a+'});
writeStream.write(`"${url}";"${raw_data}";"${tanggal}"\n`)