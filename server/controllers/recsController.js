const { query } = require('../models/tempModels.js');
const db = require('../models/tempModels.js');

const recsController = {};


recsController.getMonths = (req,res, next) => {
  //client sends the continent in params
  //controller performs db query for countries that match that continent
  //res.locals stores continents from results query
  const { continent } = req.params.continent;

  //sql query string
  const queryString = `SELECT "Countries".name as country FROM "Countries" 
  INNER JOIN "Continents" ON "Continents".continent_id="Countries".continent_id
  WHERE "Continents".name=($1);`

  //pass the continent name as the param
  const params = [continent]

  //perform query
  db.query(queryString, params)
  .then(queryResponse => {
    res.locals.countries = queryResponse.rows;
    return next();
  })
  .catch(err => {
    message = 'ERROR IN RECS CONTROLLER CHECK LOGS';
    log = 'Error in query response from getCountries'
    return next({message, log})
  })
}

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
  const splitStr = temp.split("-");
  let start = Number(splitStr[0]);
  let end = Number(splitStr[1]);
  

  /**
   * @params temp, month, [,continent, country]
   * if client sends country:
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