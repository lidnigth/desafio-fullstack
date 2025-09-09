const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database ("teste.db");

db.serialize (() => {
    db.run("CREATE TABLE IF NOT EXISTS hello (msg TEXT)");
    db.run("INSERT INTO hello (msg) VALUES (?)", ["funciona por favor"]);
    db.each("SELECT rowid AS id, msg FROM hello", (err, row) =>
    {
        console.log(row.id + ": " + row.msg);
    });
});