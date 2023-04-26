// import csv from "csv-parser";
// import util from "util";
// import fs from "fs";
const csv = require("csv-parser");
const util = require("util");
const fs = require("fs");

const readFile = util.promisify(fs.readFile);

const results = [];
try {
  // Baca file CSV
  const data = await readFile('raw-data.csv', 'utf8');

  // Parse data CSV menggunakan csv-parser
  await new Promise((resolve, reject) => {
    fs.createReadStream('raw-data.csv')
      .pipe(csv({separator: ";"}))
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });

  var hasil = JSON.parse(results[0].raw_data);
  global.hasil = hasil;

  // Jalankan kode tertentu
} catch (err) {
  console.error(err);
}

