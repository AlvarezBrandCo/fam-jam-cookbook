// server/index.js

const express = require("express");
const axios = require('axios')
const bodyParser = require('body-parser');
const utils = require("./utils");
const moment = require('moment');
const PORT = process.env.PORT || 3001;
const path = require('path');
const app = express();
var mysql = require('mysql');

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key9bqRqn7pNzJnyi'}).base('appX3z5Z2tOBdWCSz');

var recipes = require("./recipes")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "famjam"
});

// Handle GET requests to /api route

app.get("/recipes", (req, res) => {

  // con.query(`select * from recipes;`, function (err, result, fields) {
  //   if (err) throw err;
  //   res.json(result);
  // });
  
  let allThem = [];
  base('Recipes').select({
    maxRecords: 5,
    view: "Grid view"
  }).eachPage(async function page(records, fetchNextPage) {
//    This function (`page`) will get called for each page of records.

   const recipes = await records.map(function(record) {
      return record.fields
    });
    fetchNextPage();
    res.json(recipes)

  }, function done(err) {
    if (err) { console.error(err); return; }
  });
})

app.get("/stories", (req, res) => {
  let allThem = [];
  base('Stories').select({
    maxRecords: 100,
    view: "Grid view"
  }).eachPage(async function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

   const stories = await records.map(function(record) {
      return record.fields
    });
    fetchNextPage();
    res.json(stories)

  }, function done(err) {
    if (err) { console.error(err); return; }
  });
})

app.post("/stories", (req, res) => {
  const { recipe, story } = req.body
  base('Stories').create([
    {
      "fields": {
        "Recipes": [
          recipe
        ],
        "Story": story
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      res.json({status: 200})
    });
  });
})

app.post("/recipe", (req, res) => {
  recipes.add(req)
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
