const Pool = require("pg").Pool;

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
  ssl: {
    requestCert: true,
    rejectUnauthorized: false,
  },
});

module.exports = pool;
