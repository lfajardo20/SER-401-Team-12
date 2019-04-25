import React from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Picker,
} from "react-native";

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
      "https://6m2i2xewv6.execute-api.us-west-1.amazonaws.com/beta",
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
    let {
      username,
      password,
      confirmation,
      phoneNumber,
      userType,
    } = this.state;
    if (!validate(username, password, confirmation, phoneNumber, this)) return;
    //if you make it here, do  network stuff to create account

    let salt = Math.floor(Math.random() * 10000); //generates random number between 0-10,000 as a salt
    let hash = Crypto.SHA256(password + "" + salt); //using a salted, hashed password to prepare for actual security

    let accountInfo = {
      salt: salt,
      passwordHash: hash.toString(Crypto.enc.Hex), //convert to hexadecimal string,
      userName: username,
      phoneNumber: phoneNumber,
      userType: userType,
    };
    this.postAccount(accountInfo);
  };

  render() {
    let { errors } = this.state;

    if (this.state.submitResponse) {
      return (
        <View>
          <Text>Account Created Successfully</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>Username</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ username: text })}
          //style={styles.borderedField}
        />
        <Text style={styles.errorText}>{errors.username} </Text>

        <Text>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ password: text })}
          //style={styles.borderedField}
        />
        <Text style={styles.errorText}>{errors.password} </Text>

        <Text>Confirm Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ confirmation: text })}
          //style={styles.borderedField}
        />
        <Text style={styles.errorText}>{errors.confirmation} </Text>

        <Text>Phone Number</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ phoneNumber: text })}
          //style={styles.borderedField}
        />
        <Text style={styles.errorText}>{errors.phoneNumber} </Text>
        <View style={styles.borderedPicker}>
          <Picker
            selectedValue={this.state.userType}
            //style={styles.borderedPicker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ userType: itemValue })
            }
          >
            <Picker.Item label="Staff" value="doctor" />
            <Picker.Item label="Transporter" value="transporter" />
          </Picker>
        </View>
        <View style={styles.buttonStyle}>
          <Button onPress={this.submitForm} title="Submit">
            Submit
          </Button>
        </View>
      </View>
    );
  }
}

function validate(username, password, confirmation, phoneNumber, context) {
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

  context.setState({ errors: errors });
  return Object.keys(errors).length === 0; //if errors has at least one property marked, return not valid
}
/*
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
  borderedField: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  borderedPicker: {
    borderColor: "black",
    borderWidth: 2,
    height: 50,
    width: 100,
  },
});*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deeff2",
    paddingTop: 22,
    alignItems: "center",
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
  textInput: {
    backgroundColor: "#ffffff",
    padding: 6,
    marginBottom: 0,
    width: "100%",
  },
  borderedPicker: {
    //borderColor: "black",
    //borderWidth: 2,
    backgroundColor: "red",
    height: 50,
    width: 100,
  },
  buttonStyle: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: "yellow",
    marginTop: 150,
  },
});
