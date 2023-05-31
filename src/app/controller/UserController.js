const UserRepository = require('../repositories/UserRepository');
const db = require('../../db/database');

class UserController {
  async index(request, response) {
    const users = await UserRepository.findAll();

    response.send(users);
  }

  async store(request, response) {
    const { firstName, lastName, email, phone } = request.body;

    if (!firstName) {
      return response.status(400).json({ error: 'First name is required' });
    }

    if (!lastName) {
      return response.status(400).json({ error: 'Last name is required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'E-mail is required' });
    }

    if (email) {
      const userExists = await UserRepository.findByEmail(email);

      if (userExists) {
        return response
          .status(400)
          .json({ error: 'This e-mail is already in use' });
      }
    }

    const user = await UserRepository.create({
      firstName,
      lastName,
      email,
      phone,
    });

    response.status(201).json(user);
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
