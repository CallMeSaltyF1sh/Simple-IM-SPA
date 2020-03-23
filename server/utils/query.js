const mysql = require('mysql');
const { mysql_config } = require('../config/index');

const pool = mysql.createPool(mysql_config);

const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                reject(err);
            } else {
                connection.query(sql, params, (err, res) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(res);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports = query;