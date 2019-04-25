import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { State } from "react-native-gesture-handler";

//Export TransporterScreen so App.js can call it for navigation
export default class TransporterScreen extends React.Component {
  //Reading the data (title) from the previous screen
  //This is to set the title of the screen as the username
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title"),
    };
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
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Open Camera"
          //On press navigate to camera object
          onPress={() => navigate("Scanner")}
        />
      </View>
    );
  }
}
