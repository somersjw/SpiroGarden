import moment from 'moment';
import SQLite from "react-native-sqlite-storage";
import { getData } from './gameFunctions';

SQLite.enablePromise(true);

export async function getDailyRounds() {
  let start = moment().set({'hour': 0, 'minute': 1}).toISOString();
  let end = moment().toISOString();

  let result = await query('SELECT COUNT(*) as c FROM rounds WHERE timeCompleted >= ? AND timeCompleted <= ?', [start, end]);
  let row = result.rows.item(0);
  return row.c;
}

export async function getDailyRoundInfo(limit) {  
  let result = await query('SELECT * FROM rounds ORDER BY timeCompleted DESC LIMIT 20', []);
  return result.rows;
}

export async function getWeeklyRounds() {
  let start = moment().subtract(7, 'days').set({'hour': 0, 'minute': 1}).toISOString();
  let end = moment().toISOString();

  let userRPD = await getData('@userRPD');
  userRPD = parseInt(userRPD);
  console.log(userRPD);
  let result = await query('SELECT date, COUNT(*) FROM rounds WHERE timeCompleted >= ? AND timeCompleted <= ? GROUP BY date HAVING COUNT(*) >=' + userRPD.toString(), [start, end ]);
  return result.rows.length;
}

export async function getMonthlyRounds() {

  let start = moment().startOf('month').set({'hour': 0, 'minute': 1}).toISOString();
  let end = moment().toISOString();

  let userRPD = await getData('@userRPD');
  let result = await query('SELECT date, COUNT(*) FROM rounds WHERE timeCompleted >= ? AND timeCompleted <= ? GROUP BY date HAVING COUNT(*) >=' + userRPD.toString(), [start, end]);  
  return result.rows.length;
}

export async function insertAlert(dateTime, goodBreathCount, maxVolume, avgFlow) {
  // await query('DELETE FROM rounds WHERE 1', []);
  await query('INSERT INTO rounds(timeCompleted, goodBreaths, maxVolume, avgFlow, date) VALUES (?,?,?,?,?)', [dateTime, goodBreathCount, maxVolume, avgFlow, moment().format("YYYY-MM-DD")])
  .catch(err => {
    console.log(err);
  }); 
}

export function initalizeRoundTable() {
    let queryString = 'CREATE TABLE IF NOT EXISTS "rounds" (roundId INTEGER PRIMARY KEY AUTOINCREMENT, timeCompleted TEXT, goodBreaths INTEGER, avgFlow REAL,  maxVolume INTEGER, date TEXT );';
    query(queryString, []);
}

// Use this functon to query the DB
// returns `results`, access the actually SQL rows by using results.rows
// can index into specific rows using results.rows.item(x) which will just return a dictionary corresponding to that SQL row
export async function query(queryString, args) {
  return new Promise((resolve) => {
    initDB().then((db) => {
      db.transaction((tx) => {
        tx.executeSql(queryString, args).then(([tx,results]) => {
          resolve(results);
        });
      }).then((result) => {

      })
      .catch((err) => {
        console.log(queryString);
        console.log(err);
      });
    }).catch((err) => {
      console.log(queryString);
      console.log(err);
    });
  });  
}

function closeDatabase(db) {
  return new Promise((resolve) => {
    if (db) {
      console.log("Closing DB");
      return db.close()
        .then(status => {
          console.log("Database CLOSED");
          resolve(1);
        })
        .catch(error => {
          console.log(error)
          // this.errorCB(error);
        });
    } else {
      console.log("Database was not OPENED");
      resolve(0);
    }
  });
    
  };

  function initDB() {
    let db;
    return new Promise((resolve) => {
      SQLite.echoTest()
        .then(() => {
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
