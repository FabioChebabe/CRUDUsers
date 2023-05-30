const UserRepository = require('../repositories/UserRepository');
const db = require('../../db/database');

class UserController {
  async index(request, response) {
    // const test = await UserRepository.findAll();
    // console.log(test);
    db.all(`SELECT * FROM users`, [], (err, rows) => {
      if (err) {
        return console.log(err);
      }

      response.send(rows);
    });
  }

  async store(request, response) {
    const query = `INSERT INTO users (
            firstName,
            lastName,
            email,
            image
        ) VALUES (?, ?, ?, ?);
      `;
    const values = [
      request.body.firstName,
      request.body.lastName,
      request.body.email,
      request.body.image,
    ];

    db.run(query, values, (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log('funcionou');
    });
    response.send(request.body);
  }

  async show(request, response) {
    const { id } = request.params;
    console.log(id);

    db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
      if (err) {
        console.log(err);
      }

      response.send(row);
    });
  }

  async update(request, response) {
    const { id } = request.params;
    const { firstName, lastName, email, image } = request.body;

    if (!id) {
      return response.status(400).json({ error: 'User not found' });
    }

    db.run(
      `UPDATE users SET firstName = ?, lastName = ?, email = ?, image = ? WHERE id = ?`,
      [firstName, lastName, email, image, id],
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    response.sendStatus(200);
  }

  async delete(request, response) {
    const { id } = request.params;

    db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => {
      if (err) {
        console.log(err);
      }
    });

    response.sendStatus(200);
  }
}

module.exports = new UserController();
