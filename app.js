"use strict";

const express = require("express");
const yelp = require("yelp-fusion");
const KEYS = require("./secret");
const app = express();

const clientID = KEYS.clientID;
const clientSecret = KEYS.clientSecret;

const searchRequest = {
  term: 'Pizza',
  location: 'new york'
};

yelp.accessToken(clientID, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  });
}).catch(e => {
  console.log(e);
});
