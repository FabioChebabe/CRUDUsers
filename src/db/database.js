const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./src/db/database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite Database');
  // db.run(`
  //     CREATE TABLE IF NOT EXISTS users(
  //         id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
  //         firstName TEXT,
  //         lastName TEXT,
  //         image TEXT,
  //         email TEXT UNIQUE
  //   );`);
});

// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }

//   console.log('Close the database connection');
// });

module.exports = db;
