const { Pool } = require('pg');

const URI = 'postgres://iuowxmfk:jF4QcmBMddvDEm5efZ_ypVi24cYriqqt@suleiman.db.elephantsql.com:5432/iuowxmfk';

const pool = new Pool({
  connectionString: URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query: ', { text });
    return pool.query(text, params, callback);
  }
}