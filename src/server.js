const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'your_username',
  password: 'your_password',
  database: 'company_db'
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));