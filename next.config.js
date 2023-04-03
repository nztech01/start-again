const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  publicRuntimeConfig: {
    apiKey: process.env.APIKEY
  }}