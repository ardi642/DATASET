import puppeteer from "puppeteer-core";
import dotenv from "dotenv";
const wsEndpoint = dotenv.config().parsed.WS_ENDPOINT;
const browser = await puppeteer.connect({
  browserWSEndpoint: wsEndpoint,
  defaultViewport: null
});

let response, __NEXT_DATA__, data;

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
console.log(links);
response = await page.goto(links[0])
__NEXT_DATA__ = await page.evaluate(() => {return __NEXT_DATA__ })
data = __NEXT_DATA__.props.pageProps.data