const mysql = require('mysql');
const constants = require('./constants');

class Resource {

  constructor () {
    this.pool  = mysql.createPool({
      connectionLimit : 100,
      host            : 'localhost',
      user            : 'admin',
      password        : 'admin',
      database        : 'km_universe'
    });
  }

  async save(name, type) {

    return new Promise((resolve, reject) => {

      this.pool.query('INSERT INTO `resource` (name) VALUES(?)', [name], function (error, results) {
        if (error) return reject(error);

        return resolve(results.insertId);
      });
    });
  }

  async get() {

    return new Promise((resolve, reject) => {

      this.pool.query('SELECT r.*, t.tag FROM `resource` r LEFT OUTER JOIN tags t ON t.resourceId = r.id', [], function (error, results) {
        if (error) return reject(error);

        const res = [];
        const alreadyDone = {};

        results.forEach(function(part) {
          part.path = `${constants.uploadPath.substring(1)}/${part.name}`;

          const currentTag = part.tag;

          if(!alreadyDone.hasOwnProperty(part.id)) {
            part.tags = [];
            delete part.tag;

            alreadyDone[part.id] = res.push(part) - 1;
          }

          res[alreadyDone[String(part.id)]].tags.push(currentTag)
        });

        return resolve(res);
      });
    });
  }
}

module.exports = new Resource();
