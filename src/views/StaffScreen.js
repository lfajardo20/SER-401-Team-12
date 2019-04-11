import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import SchedulePage from "../schedule/schedulePage";
//Export StaffScreen so App.js can call it for navigation
export default class StaffScreen extends React.Component {
	
   constructor(props){
    super(props);
    this.id = ({"id": this.props.navigation.getParam("id")});
	this.doPostAppData();
  }
  
  static navigationOptions = {

    title: "Staff",
  };
  
  state = {
	tableHead: ['Date', 'mrNumber', 'Account Number'],
    data: [" "," "," "],
  };
  
  
  doPostAppData() {
    return fetch("https://ia7gon58j7.execute-api.us-west-1.amazonaws.com/schedule",
      {
        method: "POST", headers:
          { Accept: "application/json", "Content-Type": "application/json" }
	  , body: (JSON.stringify(this.id)),
      })
      .then((response) => response.json())
      .then((responseJson) => {
		  
		  objResponse = JSON.parse(responseJson.substr(1,responseJson.length - 2));
		  ObjArray = [objResponse.date, objResponse.mrNumber, objResponse.accountNum]
		  
        this.setState({
          data: ObjArray
        });
      })
      .catch((error) => { console.error(error); });
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
	<View style={styles.container}>
		<Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
			<Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
			<Row data={this.state.data} textStyle={styles.text}/>
        </Table>
	</View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});