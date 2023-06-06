import { Client } from 'pg';

const client = new Client({
  // host: '192.168.0.232',
  host: '192.168.15.21',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'userssql',
});

client.connect();

const query = async (query: string, values?: any) => {
  const { rows } = await client.query(query, values);

  return rows;
};

const db = { query };

export default db;
