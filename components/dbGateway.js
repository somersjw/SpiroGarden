import moment from 'moment';
import SQLite from "react-native-sqlite-storage";

SQLite.enablePromise(true);

export function getDailyRounds(prod) {
  let start = moment().set({'hour': 0, 'minute': 1}).toISOString();
  let end = moment().toISOString();

  query('SELECT COUNT(*) as c FROM rounds', [])
  .then((result) => {
    let row = result.rows.item(0);
    console.log(row.c);
     return row.c;
  })
  .catch(err => {
    console.log(err);
  }); 
}

export function insertAlert(dateTime, goodBreathCount, maxVolume, avgFlow) {
  query('INSERT INTO rounds(timeCompleted, goodBreaths, maxVolume, avgFlow) VALUES (?,?,?,?)', [dateTime, goodBreathCount, maxVolume, avgFlow])
  .then(result => {
    console.log('Round logged in database');
  })
  .catch(err => {
    console.log(err);
  }); 
}


// Use this functon to query the DB
// returns `results`, access the actually SQL rows by using results.rows
// can index into specific rows using results.rows.item(x) which will just return a dictionary corresponding to that SQL row
export function query(queryString, args) {
  return new Promise((resolve) => {
    initDB().then((db) => {
      db.transaction((tx) => {
        tx.executeSql(queryString, args).then(([tx,results]) => {
            resolve(results);
        });
      }).then((result) => {
        closeDatabase(db);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });  
}


// export function initalizeRoundTable() {
//     var db = getDb();
//     var createRoundsTable = 'CREATE TABLE IF NOT EXISTS rounds(roundID INTEGER PRIMARY KEY AUTOINCREMENT, '
//                   + 'timeCompleted TEXT, goodBreaths INTEGER, '
//                   + 'maxVolume INTEGER, avgFlow INTEGER)';
//     db.executeSql(createRoundsTable, []);
// }

function closeDatabase(db) {
    if (db) {
      console.log("Closing DB");
      db.close()
        .then(status => {
          console.log("Database CLOSED");
        })
        .catch(error => {
          this.errorCB(error);
        });
    } else {
      console.log("Database was not OPENED");
    }
  };

  function initDB() {
    let db;
    return new Promise((resolve) => {
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase({ name: 'userData.db', createFromLocation : 1})
            .then(DB => {
              db = DB;
              resolve(db);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log("echoTest failed - plugin not functional");
        });
      });
  };
