const request = require('request');
const credentials = require('./credentials');

function getCoordinateWeather(latitude, longitude) {
  const darkSkyUrl =
      `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${
          latitude},${longitude}?lang=es&units=si`;

  request(darkSkyUrl, {json: true}, (err, res) => {
    if (err) {
      return console.log(err);
    }
    const message = `${res.body.currently.summary}. Actualmente esta a ${
        res.body.currently.temperature}°C. Hay ${
        res.body.currently.precipProbability}% de probabilidad de lluvia.`
    console.log(message);
  });
}

function getCityWeather(city) {
  const formattedCity = city.split(' ').join('_');
  const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
      formattedCity}.json?limit=1&access_token=${credentials.MAPBOX_TOKEN}`;

  request(mapBoxUrl, {json: true}, (err, res) => {
    if (err) {
      return console.log(err);
    }

    if (res.body.features.length === 0) {
      return console.log('City not found.');
    }

    const latitude = res.body.features[0].center[1];
    const longitude = res.body.features[0].center[0];
    getCoordinateWeather(latitude, longitude);
  });
}

getCityWeather('Monterrey');
