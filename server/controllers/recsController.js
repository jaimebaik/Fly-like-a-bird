const db = require('../models/tempModels.js');

const recsController = {};


recsController.getRecs = (req, res, next) => {
  const { temp, continent, country, month } = req.body;
  /** format of temp data
   * "0-30"
   * "30-50"
   * "50-60"
   * "60-70"
   * "70-80"
   * "80-90" --> start: 80, end: 90
   * "90+"
  */
  let start;
  let end;
   switch(temp) {
     case '0-30': 
      start = 0;
      end = 30;
      break;
     case '30-50': 
      start = 30;
      end = 50;
      break;
     case '50-60': 
      start = 50;
      end = 60;
      break;
     case '60-70': 
      start = 60;
      end = 70;
      break;
     case '70-80': 
      start = 70;
      end = 80;
      break;
     case '80-90': 
      start = 80;
      end = 90;
      break;
     case '90+': 
      start = 90;
      end = 999;
      break;
   }

  /**
   * @params optional country
   * is country NOT Falsey
   * join the countries & join cities where country_id match & join temperatures where temp < high && temp > low, match month
   * if country is falsey
   * all above except join continents with all countries & all cities
  */
 let queryForCities, cities;
 if (country) {
   queryForCities = `SELECT "Cities".name as city, "Countries".name as country, "Temperature".temperature
     FROM "Cities"
     INNER JOIN "Countries" ON "Countries".country_id="Cities".country_id
     INNER JOIN "Temperature" ON "Temperature".city_id="Cities".city_id
     WHERE "Countries".name=($1)
     AND "Temperature".temperature < ($2) AND "Temperature".temperature > ($3)
     AND "Temperature".month=($4)`
   cities = [country, end, start, month];
 } else {
   queryForCities = `SELECT "Cities".name as city, "Countries".name as country, "Temperature".temperature
    FROM "Cities"
    INNER JOIN "Countries" ON "Countries".country_id="Cities".country_id
    INNER JOIN "Continents" ON "Continents".continent_id="Countries".continent_id
    INNER JOIN "Temperature" ON "Temperature".city_id="Cities".city_id
    WHERE "Continents".name=($1)
    AND "Temperature".temperature < ($2) AND "Temperature".temperature > ($3)
    AND "Temperature".month=($4)`
   cities = [continent, end, start, month];
 }

  db.query(queryForCities, cities)
   .then(data => {
     console.log('data.rows: ', data.rows)
     res.locals.cityData = data.rows;
     return next();
   })
   .catch(err => {
     const log = `Error occured in db query for cities in recsController`
     const message = `recsController error`
     return next()
   })
}


module.exports = recsController;