const {Pool} = require('pg');

const pool = new Pool({
    max: 20,
    connectionString: process.env.DATABASE_URL || 'postgres://airtribe:password@localhost:5432/airtribe',
    idleTimeoutMillis: 30000,
});

module.exports = {
    pool,
};