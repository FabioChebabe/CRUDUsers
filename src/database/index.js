const { Client } = require('pg');

const client = new Client({
  host: '192.168.0.232',
  // host: '192.168.2.106',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);

  return rows;
};
