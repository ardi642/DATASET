import puppeteer from "puppeteer-core";
import * as fs from "fs";

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await puppeteer.launch({
  executablePath: chromePath, 
  headless: false, 
  userDataDir: 'C:\\Users\\62852\\AppData\\Local\\Google\\Chrome\\User Data',
  args: ['--no-sandbox', '--remote-debugging-port=9555']
});

const wsEndpoint = browser.wsEndpoint();
// Menulis variabel environment ke file .env
fs.writeFileSync('.env', `WS_ENDPOINT=${wsEndpoint}`);