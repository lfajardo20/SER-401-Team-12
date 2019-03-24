import React from "react";
import { Text, TextInput, View, Button, StyleSheet } from "react-native";

import Crypto from "crypto-js";

export default class SignupForm extends React.Component {
  state = {
    username: "",
    password: "",
    confirmation: "",
    email: "",
    errors: {},
    submitResponse: null,
  };

  postAccount = accountInfo => {
    return fetch(
      "https://8svpahmpbc.execute-api.us-west-1.amazonaws.com/Test", //TODO make account creation API endpoint
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountInfo),
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            submitResponse: responseJson,
          },
          function() {
            console.log(JSON.stringify(accountInfo));
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  submitForm = () => {
    let { username, password, confirmation, email } = this.state;
    if (!validate(username, password, confirmation, email)) return;
    //if you make it here, do  network stuff to create account

    let salt = Math.floor(Math.random() * 10000); //generates random number between 0-10,000 as a salt
    let hash = Crypto.SHA256(password + salt); //using a salted, hashed password to prepare for actual security

    let accountInfo = {
      salt: salt,
      hash: hash,
      username: username,
      email: email,
    };

    this.postAccount(accountInfo);
  };

  render() {
    let { errors } = this.state;
    return (
      <View style={styles.container}>
        <Text>Username</Text>
        <TextInput style={styles.textInput} onChangeText={text => this.setState({ username: text })} />
        <Text style={styles.errorText}>{errors.username} </Text>

        <Text>Password</Text>
        <TextInput style={styles.textInput} onChangeText={text => this.setState({ password: text })} />
        <Text style={styles.errorText}>{errors.password} </Text>

        <Text>Confirm Password</Text>
        <TextInput style={styles.textInput}
          onChangeText={text => this.setState({ confirmation: text })}
        />
        <Text style={styles.errorText}>{errors.confirmation} </Text>

        <Text>Email Address</Text>
        <TextInput style={styles.textInput} onChangeText={text => this.setState({ email: text })} />
        <Text style={styles.errorText}>{errors.email} </Text>
        <View style={styles.buttonStyle}>
          <Button onPress={this.submitForm} title="Submit">
            Submit
          </Button>
        </View>
      </View>
    );
  }
}

function validate(username, password, confirmation, email) {
  let errors = {};
  //start basic validation, will need refactors and upgrades once API is up and integrated

  //create error data for empty required fields
  if (!username) {
    errors.username = "required";
  }
  if (!password) {
    errors.password = "required";
  }
  if (!confirmation) {
    errors.confirmation = "required";
  }
  if (!email) {
    errors.email = "required";
  }

  if (password !== confirmation) {
    errors.confirmation = "Does not match password";
  }

  this.setState({ errors: errors });
  return Object.keys(errors).length === 0; //if errors has at least one property marked, return not valid
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#deeff2',
    paddingTop: 22,
    alignItems: 'center',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  errorText: {
    color: "red",
    fontSize: 8,
    marginBottom: 20,
  },
  textInput:{
    backgroundColor:'#ffffff',
    padding:6,
    marginBottom:0,
    width:'100%',
  },
  buttonStyle:{
    height: 40,
    width:100,
    borderRadius:20,
    backgroundColor : "yellow",
    marginTop :20,
  },
});
