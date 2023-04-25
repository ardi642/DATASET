import puppeteer from 'puppeteer-core';
// const repl = require('repl');
import repl from 'repl';
(async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: 'ws://127.0.0.1:9555/devtools/browser/671ec4bb-6ad3-4c9d-8e2c-0d6e0fc236bd'
  });
  const page = await browser.newPage();

  // enter REPL mode
  repl.start('> ').context.page = page;
})();