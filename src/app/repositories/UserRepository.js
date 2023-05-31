const db = require('../../database');

class UserRepository {
  async findAll(orderBy) {
    const orderDirection = !!orderBy
      ? orderBy.toUpperCase() === 'DESC'
        ? 'DESC'
        : 'ASC'
      : null;
    const rows = await db.query(`SELECT * FROM users`);

    return rows;
  }

  async findById(id) {}

  async findByEmail(email) {
    const [row] = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    return row;
  }

  async create({ firstName, lastName, email, phone }) {
    const [row] = await db.query(
      `INSERT INTO users(firstName, lastName, email, phone)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [firstName, lastName, email, phone]
    );

    return row;
  }
}

module.exports = new UserRepository();
