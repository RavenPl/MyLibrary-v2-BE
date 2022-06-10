import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'odin_lib',
    namedPlaceholders: true,
    decimalNumbers: true,
});