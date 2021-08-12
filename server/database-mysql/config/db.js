const { connection } = require("./connect.js")

/* Db Connection*/

connection.connect(function (err) {
    if (err) throw err;
    console.log("MySQL Database Connected Successfully!");
});

// MySQL promise database injector
const sql = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (!!error) {
                reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = {
    sql
}
