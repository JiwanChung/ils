import { LiveMysql } from 'meteor/numtel:mysql';

var liveDb = new LiveMysql({
    host: '10.0.0.1',
    // Port 3407 as specified in leaderboard.mysql.json
    // If using external MySQL server, the default port is 3306
    port: 3306,
    user: 'yslaw2',
    password: 'law6015!',
    database: 'yslaw2'
});

Meteor.publish('allContent', function(){
  return liveDb.select(
    `SELECT * FROM content`,
    [ { table: 'content' } ]
  );
});

Meteor.publish('showDoc', function(name) {
    return liveDb.select(
      'SELECT id, titleinput, doc FROM content WHERE titleinput = ' + liveDb.db.escape(name),
      [
        {
          table: 'content',
          condition: function(row, newRow, rowDeleted) {
            // newRow provided on UPDATE query events
            return row.name === name || (newRow && newRow.name === name);
          }
        }
      ]
    );
  });

  Meteor.methods({
    'upDoc': function(titleinput, newdoc) {

      liveDb.db.query(
        'UPDATE content SET doc = ? WHERE titleinput = ?', [ newdoc, titleinput ]);
    }
  });

var closeAndExit = function() {
    liveDb.end();
    process.exit();
};
// Close connections on hot code push
process.on('SIGTERM', closeAndExit);
// Close connections on exit (ctrl + c)
process.on('SIGINT', closeAndExit);
