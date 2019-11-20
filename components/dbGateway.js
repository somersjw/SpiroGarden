import moment from 'moment';
import { openDatabase } from 'react-native-sqlite-storage';
export function getDailyRounds() {
    let start = moment().set({'hour': 0, 'minute': 1}).toISOString();
    let end = moment().toISOString();

    var db = getDb();
    var rounds = 0;
    db.transaction((tx) => {
        tx.executeSql('SELECT COUNT(*) as c FROM rounds', [], (tx, results) => {
            rounds = results.rows.item(0).c;
        })
    })

    return rounds;
}

export function insertAlert(avgFlow, time) {
    var db = getDb();
    db.transaction(function(tx) {
      tx.executeSql('INSERT INTO rounds(timeCompleted, goodBreathsCompleted, maxVolume, avgFlow) VALUES (?,?,?)',
                    [dateTime, this.state.goodBreathCount, this.state.val, avgFlow]
      )
    });
    console.log('Round logged in database');
}

export function initalizeRoundTable() {
    var db = getDb();
    var createRoundsTable = 'CREATE TABLE IF NOT EXISTS rounds(roundID INTEGER PRIMARY KEY AUTOINCREMENT, '
                  + 'timeCompleted TEXT, goodBreathsCompleted INTEGER, '
                  + 'maxVolume INTEGER, avgFlow INTEGER)';
    db.executeSql(createRoundsTable, []);
}

function getDb() {
    return openDatabase({ name: 'CompletedRounds.db' });
}