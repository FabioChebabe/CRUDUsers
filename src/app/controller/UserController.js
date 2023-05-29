const UserRepository = require('../repositories/UserRepository');
const db = require('../../db/database');

class UserController {
  async index(request, response) {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
      if (err) {
        return console.log(err);
      }

      response.send(rows);
    });
  }
}

module.exports = new UserController();
