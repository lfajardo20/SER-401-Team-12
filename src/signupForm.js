import React from "react";
import { Text, TextInput, View, Button, StyleSheet } from "react-native";

import Crypto from "crypto-js";

export default class SignupForm extends React.Component {
  state = {
    username: "",
    password: "",
    confirmation: "",
    userType: "",
    phoneNumber: "",
    errors: {},
    submitResponse: null,
  };

  postAccount = accountInfo => {
    return fetch(
      "https://2znkbd4rua.execute-api.us-west-1.amazonaws.com/beta",
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
    let { username, password, confirmation, phoneNumber } = this.state;
    if (!validate(username, password, confirmation, phoneNumber)) return;
    //if you make it here, do  network stuff to create account

    let salt = Math.floor(Math.random() * 10000); //generates random number between 0-10,000 as a salt
    let hash = Crypto.SHA256(password + salt); //using a salted, hashed password to prepare for actual security

    let accountInfo = {
      salt: salt,
      hash: hash,
      username: username,
      phoneNumber: phoneNumber,
    };

    this.postAccount(accountInfo);
  };

  render() {
    let { errors } = this.state;
    return (
      <View>
        <Text>Username</Text>
        <TextInput onChangeText={text => this.setState({ username: text })} />
        <Text style={styles.errorText}>{errors.username} </Text>

        <Text>Password</Text>
        <TextInput onChangeText={text => this.setState({ password: text })} />
        <Text style={styles.errorText}>{errors.password} </Text>

        <Text>Confirm Password</Text>
        <TextInput
          onChangeText={text => this.setState({ confirmation: text })}
        />
        <Text style={styles.errorText}>{errors.confirmation} </Text>

        <Text>Phone Number</Text>
        <TextInput
          onChangeText={text => this.setState({ phoneNumber: text })}
        />
        <Text style={styles.errorText}>{errors.phoneNumber} </Text>

        <Button onPress={this.submitForm} title="Submit">
          Submit
        </Button>
      </View>
    );
  }
}

function validate(username, password, confirmation, phoneNumber) {
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
  if (!phoneNumber) {
    errors.phoneNumber = "required";
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
    paddingTop: 22,
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
});
