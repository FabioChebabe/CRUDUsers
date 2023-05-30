const db = require('../../db/database');

class UserRepository {
  async findAll() {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
      if (err) {
        return console.log(err);
      }

      return new Promise(function (resolve, reject) {
        resolve(rows);
      });
    });
  }
}

module.exports = new UserRepository();
