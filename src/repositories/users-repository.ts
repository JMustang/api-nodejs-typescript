import Users from "../models/users";
import database from "./database";

const usersRepository = {
  create: (user: Users, callback: (id?: number) => void) => {
    const sql = `INSERT INTO users (name, last_name) VALUES (?, ?)`;
    const params = [user.name, user.last_name];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },

  readAll: (callback: (users: Users[]) => void) => {
    const sql = `SELECT * FROM users `;
    database.all(sql, [], (_err, rows) => callback(rows || []));
  },

  readById: (id: number, callback: (users: Users) => void) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    database.get(sql, [id], (_err, rows) => callback(rows));
  },

  update: (id: number, user: Users, callback: (notFound: boolean) => void) => {
    const sql = "UPDATE users SET name = ?, last_name = ? WHERE id = ?";
    const params = [user.name, user.last_name, id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },

  delete: (id: number, callback: (notFound: boolean) => void) => {
    const sql = "DELETE FROM users WHERE id = ?";
    const params = [id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
};

export default usersRepository;
