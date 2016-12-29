var mysql = require('mysql');
export const Mysql = mysql.createPool({
  connectionLimit : 10,
  host     : '10.0.0.1',
  user     : 'yslaw2',
  password : 'changnam99892',
  database : 'yslaw2'
});

Mysql.getConnection(function(err, connection) {
  console.log("MySQL connected");
  // connected! (unless `err` is set)
});

var Fiber = Npm.require('fibers');

Meteor.methods({
  'upDoc': function(id, newdoc) {
    var fiber = Fiber.current;
    var query = Mysql.query('UPDATE content SET doc = ? WHERE id = ?', [ newdoc, id ], function(err, results) {
      fiber.run(results);
      return results;
    });
    var res = Fiber.yield();
    return res;
  },
  'showDoc': function(titleinput, callback) {
    var fiber = Fiber.current;
    var query = Mysql.query('SELECT * FROM content WHERE titleinput = ?', [ titleinput ], function(err, results) {
      fiber.run(results);
      return results;
    });
    var res = Fiber.yield();
    return res[0];
  },
  'inDoc': function(titleinput) {
    var fiber = Fiber.current;
    var query = Mysql.query('INSERT INTO content(titleinput, doc) VALUES (? , null)', [ titleinput ], function(err, results) {
      fiber.run(results);
      return results;
    });
    var res = Fiber.yield();
    return res;
  },
  'inPic': function(name, type, doc, parentid, parenttype) {
    var fiber = Fiber.current;
    var query = Mysql.query('INSERT INTO pic(name, type, doc, parentid, parenttable) VALUES (? , ? , ? , ? , ?)', [ name, type, doc, parentid, parenttype ], function(err, results) {
      fiber.run(results);
      return results;
    });
    var res = Fiber.yield();
    return res;
  },
  'showPic': function(pid, ptable) {
    var fiber = Fiber.current;
    console.log(pid, ptable);
    var query = Mysql.query('SELECT * FROM pic WHERE parentid = ? and parenttable = ?', [ pid, ptable ], function(err, results) {
      fiber.run(results);
      return results;
    });
    var res = Fiber.yield();
    var images = [];
    for (var i in res) {
      var obj = res[i];
      images.push(eval(obj.doc));
    }
    return images;
  },
  'inGal': function(name, type, detail) {
    var fiber = Fiber.current;
    var query = Mysql.query('INSERT INTO galleryall(name, type, detail, createdAt) VALUES ( ? , ? , ? , NOW() )', [ name, type, detail ], function(err, results) {
      fiber.run(results);
      return results;
    });
    var res = Fiber.yield();
    return res;
  },
  'showGal': function(type) {
    var fiber = Fiber.current;
    var query = Mysql.query('SELECT * FROM galleryall WHERE type = ?', [ type ], function(err, results) {
      fiber.run(results);
      return results;
    });
    var res = Fiber.yield();
    return res;
  },
  'delGal': function(id, type) {
    var fiber = Fiber.current;
    var query = Mysql.query('DELETE FROM galleryall WHERE type = ? AND id = ?', [ type, id ], function(err, results) {
      fiber.run(results);
      return results;
    });
    var res = Fiber.yield();
    return res;
  },
});

var closeAndExit = function() {
   Mysql.end();
   process.exit();
};
// Close connections on hot code push
process.on('SIGTERM', closeAndExit);
// Close connections on exit (ctrl + c)
process.on('SIGINT', closeAndExit);
