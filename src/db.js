//creo un objeto pool
const { Pool } = require("pg")

const pool = new Pool({

  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;

/*user: 'qkbkeqsjobjgiq',
host: 'ec2-54-165-90-230.compute-1.amazonaws.com',
password: 'd693d1b8d929b1c91e9a0148735408a5edd5d3b78ebef678b0fb443556a39780',
port: '5432',
database: 'd3bjn19bl5prqr',*/