import React from "react";
import { Text, TextInput, View, Button } from "react-native";

import Crypto from "crypto-js";

export default class SignupForm extends React.Component {
  state = {
    username: "",
    password: "",
    confirmation: "",
    email: "",
  };

  submitForm = () => {
    let { username, password, confirmation, email } = this.state;
    //start basic validation, will need refactors and upgrades once API is up and integrated
    if (!username || !password || !confirmation || !email) {
      //exit if any field is empty
      return;
    } else if (password !== confirmation) {
      return;
    }

    //if you make it here, do  network stuff to create account

    let salt = Math.floor(Math.random() * 10000); //generates random number between 0-10,000 as a salt
    let hash = Crypto.SHA256(password + salt); //using a salted, hashed password to prepare for actual security
  };
  render() {
    return (
      <View>
        <Text>Username</Text>
        <TextInput onChangeText={text => this.setState({ username: text })} />

        <Text>Password</Text>
        <TextInput onChangeText={text => this.setState({ password: text })} />

        <Text>Confirm Password</Text>
        <TextInput
          onChangeText={text => this.setState({ confirmation: text })}
        />

        <Text>Email Address</Text>
        <TextInput onChangeText={text => this.setState({ email: text })} />

        <Button onPress={this.submitForm}>Submit</Button>
      </View>
    );
  }
}
