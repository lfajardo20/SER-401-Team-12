import React, { Component } from "react";
import { FlatList, ActivityIndicator, Text, View, StyleSheet, AppRegistry, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";


//Export ConfirmationScreen so App.js can call it for navigation
export default class ConfirmationScreen extends React.Component {
  state = {
    id: null,
    loc: null,
    isLoading: null,
    dataSource: null,
  }

  confirmationObj = {
    id: null,
  }

  constructor(props) {
    //Get objects from previous view
    super(props);
    this.state.id = this.props.navigation.getParam("id");
    this.state.loc = this.props.navigation.getParam("loc");

    this.confirmationObj.id = this.state.id;

    this.state.isLoading = true;
    //Do the server post to get data
    this.doPostConfirmation();
  }

  doPostConfirmation() {
    return fetch("https://8svpahmpbc.execute-api.us-west-1.amazonaws.com/Test",
      {
        method: "POST", headers:
          { Accept: "application/json", "Content-Type": "application/json" }
        , body: JSON.stringify(this.confirmationObj),
      })
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: JSON.parse(JSON.stringify(responseJson).substring(1, JSON.stringify(responseJson).length - 1)),
        }, function () {
          //Testing functions
        });
      })
      .catch((error) => { console.error(error); });
  }

  doPostConfirmationTrue() {
    this.setState({
      isLoading: true
    });
    this.confirmationObj.location = this.state.loc;
    return fetch("https://k634ch08g9.execute-api.us-west-1.amazonaws.com/test",
      {
        method: "POST", headers:
          { Accept: "application/json", "Content-Type": "application/json" }
        , body: JSON.stringify(this.confirmationObj),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {
          //Testing functions go here
          this.props.navigation.navigate("Transporter");
        });
      })
      .catch((error) => {
        console.error(error);
      });

    // Change screen after post
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <View style={styles.varText}>
          <Text style={styles.text}>Patient ID:{this.state.dataSource.id}</Text>
          <Text style={styles.text}>Firstname:{this.state.dataSource.firstname}</Text>
          <Text style={styles.text}>Lastname ID:{this.state.dataSource.lastname}</Text>
          <Text style={styles.text}>Age:{this.state.dataSource.age}</Text>
          <Text style={styles.text}>Sex:{this.state.dataSource.sex}</Text>
          <Text style={{ fontSize: 16, padding: 10, marginTop: 50 }}>Is the information above correct?}</Text>
        </View>
        <View style={styles.row}>
          <Button
            title="Yes"
            onPress={() => this.doPostConfirmationTrue()}
          />
          <Button
            title="No"
            onPress={() => this.props.navigation.navigate("Scanner")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
  },
  varText: {
    marginTop: '20%',
    marginBottom: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  text:
  {
    fontSize: 22,
    padding: 3,
  },
});
