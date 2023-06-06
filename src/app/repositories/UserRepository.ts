// const db = require('../../database/index.js');
import db from '../../database/index';

interface Users {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface UsersApi {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
}

class UserRepository {
  async findAll(orderBy?: string | null) {
    const orderDirection = !!orderBy
      ? orderBy.toUpperCase() === 'DESC'
        ? 'DESC'
        : 'ASC'
      : null;
    const rows = await db.query(`SELECT * FROM users`);

    return rows;
  }

  async findById(id: string) {
    const [row] = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);

    const data: UsersApi | any = row;

    return data;
  }

  async findByEmail(email: string) {
    const [row] = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const data: UsersApi | any = row;

    return data;
  }

  async create({ firstName, lastName, email, phone }: Users) {
    const [row] = await db.query(
      `INSERT INTO users(firstName, lastName, email, phone)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [firstName, lastName, email, phone]
    );

    return row;
  }

  async update(id: string, { firstName, lastName, email, phone }: Users) {
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

  async delete(id: string) {
    const deleteOp = db.query(`DELETE FROM users WHERE id = $1`, [id]);

    return deleteOp;
  }
}

export default new UserRepository();
