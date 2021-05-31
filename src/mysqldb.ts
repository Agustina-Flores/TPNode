import { createPool } from "mysql";

export const cxMysql = createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "tpn",
  connectionLimit: 100, //100 es el valor por defecto
});
