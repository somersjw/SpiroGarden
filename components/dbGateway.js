import moment from 'moment';
import { openDatabase } from 'react-native-sqlite-storage';
export async function getDailyExcercises() {
    let start = moment().set({'hour': 0, 'minute': 1}).toISOString();

    let end = moment().toISOString();

    var db = openDatabase({ name: 'CompletedRounds.db' });
    var rounds = 0;
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM rounds WHERE completedAt >= ? AND completedAt <= ?', [start, end], (tx, results) => {
            rounds = results.rows.length;
        })
    })

    return rounds;
}