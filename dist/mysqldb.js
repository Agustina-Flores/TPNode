"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
exports.cxMysql = mysql_1.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "tpn",
    connectionLimit: 100,
});
