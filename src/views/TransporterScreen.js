import React, { Component } from "react";
import { Button, View, Text } from "react-native";

//Export TransporterScreen so App.js can call it for navigation
export default class TransporterScreen extends React.Component {
  static navigationOptions = {
    title: "Transporter",
  };
  
  doPostConfirmationTrue() {
    this.confirmationObj.location = this.state.loc;
    alert(JSON.stringify(this.confirmationObj));
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
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center",justifyContent: "center", backgroundColor: '#DC143C'}}>
        <Button color='white'
          fontSize='20'
          title="Open Camera"
          //On press navigate to camera object
          onPress={() => navigate("Scanner")}
        />
      </View>
    );
  }
}