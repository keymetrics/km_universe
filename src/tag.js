const mysql = require('mysql');

class Tag {

  constructor () {
    this.pool  = mysql.createPool({
      connectionLimit : 100,
      host            : 'localhost',
      user            : 'admin',
      password        : 'admin',
      database        : 'km_universe'
    });
  }

  async save(tags, resourceId) {

    return new Promise((resolve, reject) => {

      const values = [];
      let subQuery = '';
      for(let i = 0; i < tags.length; i++) {
        values.push(resourceId);
        values.push(tags[i]);
        subQuery += '(?,?),'
      }

      subQuery = subQuery.replace(/,\s*$/, "");
      console.log(subQuery, values)

      this.pool.query('INSERT INTO `tags` (resourceId, tag) VALUES ' + subQuery, values, function (error, results) {
        if (error) return reject(error);

        return resolve(results.insertId);
      });
    });
  }

  async get() {

    return new Promise((resolve, reject) => {

      this.pool.query('SELECT tag FROM `tags`', [], function (error, results) {
        if (error) return reject(error);

        return resolve(results);
      });
    });
  }
}

module.exports = new Tag();
