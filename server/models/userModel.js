const { Pool } = require('pg');

const PG_URI = 'postgres://fzgysnpa:WF9YxuS2ViOIbgS2Ft7OFF-5kext_il8@heffalump.db.elephantsql.com/fzgysnpa';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
        console.log('queried', text);
        return pool.query(text, params, callback);
    }
}