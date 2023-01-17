import sqlite3 from "sqlite3";

const DBSOURCE = "data.sqlite";

const SQL_ITENS_CREATE = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        last_name TEXT,
    )
`;

const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Base de dados conectado com sucesso!!!");
    database.run(SQL_ITENS_CREATE, (err) => {
      if (err) {
        // Possivelmente a tabela já foi criada
      } else {
        console.log("Tabela users criada com sucesso!!!");
      }
    });
  }
});

export default database;
