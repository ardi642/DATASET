import puppeteer from "puppeteer-core";
import dotenv from "dotenv";
const wsEndpoint = dotenv.config().parsed.WS_ENDPOINT;
const browser = await puppeteer.connect({
  browserWSEndpoint: wsEndpoint
});

const page = await browser.newPage();