const UserRepository = require('../repositories/UserRepository');
const isValidUUID = require('../utils/isValidUUID');

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

    if (!isValidUUID(id)) {
      return response.status(400).json('User not found');
    }

    const user = await UserRepository.findById(id);

    response.send(user);
  }

  async update(request, response) {
    const { id } = request.params;
    const { firstName, lastName, email, phone } = request.body;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'User not found' });
    }

    const userAlreadyExists = await UserRepository.findById(id);

    if (!userAlreadyExists) {
      return response.status(400).json({ error: 'User not found' });
    }

    if (email) {
      const userById = await UserRepository.findByEmail(email);

      if (userById && userById.id !== id) {
        return response
          .status(400)
          .json({ erro: 'This e-mail is alredy in use' });
      }
    }

    const user = await UserRepository.update(id, {
      firstName: firstName || userAlreadyExists.firstname,
      lastName: lastName || userAlreadyExists.lastname,
      email: email || userAlreadyExists.email,
      phone: phone || userAlreadyExists.phone,
    });

    response.json(user);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'User not found' });
    }

    await UserRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new UserController();
