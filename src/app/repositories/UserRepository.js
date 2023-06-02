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

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);

    return row;
  }

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

  async update(id, { firstName, lastName, email, phone }) {
    const [row] = await db.query(
      `
    UPDATE users
    SET firstName = $1, lastName = $2, email = $3, phone = $4
    WHERE id = $5
    RETURNING *
    `,
      [firstName, lastName, email, phone, id]
    );

    return row;
  }

  async delete(id) {
    const deleteOp = db.query(`DELETE FROM users WHERE id = $1`, [id]);

    return deleteOp;
  }
}

module.exports = new UserRepository();
