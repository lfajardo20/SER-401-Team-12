import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  AppState,
} from "react-native";

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
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.buttonStyle}>
          <Button
            style={{ color: 'white' }}
            color='red'
            fontSize='20'
            title="Open Camera"
            //On press navigate to camera object
            onPress={() => navigate("Scanner")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DC143C',
    alignItems: 'center',
    justifyContent: "center"
  },
  textNav: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonStyle: {
    height: 40,
    width: '50%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttontextColor: {
    color: 'red',
    fontWeight: 'bold',
  },
});