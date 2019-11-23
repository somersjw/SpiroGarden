import React from "react";
import { View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView } from "react-native";
import {getDailyRoundInfo} from './dbGateway';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import styles from './styles';


export default class RecentRounds extends React.Component {
    constructor() {
        super();
        this.state = {
            tableHead: ["Date", "Rounds Passed", "Max Volume", "Average Flow"],
            tableData: [['1','1','1','1']]
          }
        this.formatData = this.formatData.bind(this);
    }

    async componentDidMount() {
      let roundInfo = await getDailyRoundInfo(10);
      let formattedroundData = this.formatData(roundInfo); 
      console.log(formattedroundData);
      this.setState({
          tableData: formattedroundData
      })
    }

    formatData(roundInfo) {
        let res = [];
        let len = roundInfo.length;
          for (let i = 0; i < len; i++) {
              let tmp = [];
              let row = roundInfo.item(i);
              tmp.push(row.date, row.goodBreaths, row.maxVolume, row.avgFlow);
              res.push(tmp);
          }
          return res;
    }

    render (){
        const state = this.state;
        return (
            <View style={styles2.container}>
                <Text style={styles.titlelarge}> Your Last 10 Excercises</Text>
            <Table borderStyle={{borderWidth: 2, borderColor: '#FFF'}}>
              <Row data={state.tableHead} style={styles2.head} textStyle={styles2.headText}/>
              <Rows data={state.tableData}  style={styles2.row} textStyle={styles2.text}/>
            </Table>
            </View>
        );
      }
}

const styles2 = StyleSheet.create({
    container: { flex: 1,padding: 5, backgroundColor: '#87a08b'},  
    head: { height: 40, backgroundColor: '#3a5335' },
    headText: { margin: 6, textAlign: 'center', fontSize: 15, fontWeight: 'bold', fontFamily:'LIONELLORegular', color:'#fff'},
    text: { margin: 6, textAlign: 'center', fontSize: 15, color: '#fff'},
    row: {alignItems: 'center'}
  });