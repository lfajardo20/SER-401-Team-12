import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Crypto from "crypto-js";

export default class NewForms extends React.Component {
  state = {
    values: {
      startDate: new Date()
    }
  };

  submitPatient = () => {};

  submitUser = async() => {
    console.log("Entered the submitUser!");
    let { values } = this.state;

    let salt = Math.floor(Math.random() * 10000); //generates random number between 0-10,000 as a salt
    let hash = Crypto.SHA256(values.password + "" + salt); //using a salted, hashed password to prepare for actual security

    let accInfo = {
      salt: salt,
      passwordHash: hash.toString(Crypto.enc.Hex), //convert to hexadecimal string
      userName: values.username,
      phoneNumber: values.phoneNumber,
      userType: values.userType,
      fullname: values.name
    };
    this.postAccount(accInfo);
  };

  postAccount = data => {
    const url = "https://6m2i2xewv6.execute-api.us-west-1.amazonaws.com/beta";
    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
      })
      .catch(error => {
        console.error(error);
      });
  };

  submitAppointment = () => {};

  render() {
    const { type } = this.props;
    const { values } = this.state;

    if (!type) return null; //don't render if previous fields not selected

    if (type === "patients") {
      return (
        <>
          <h3>Adding a new Patient:</h3>
          <form>
            Name
            <input
              onChange={text =>
                this.setState({ values: { ...values, name: text } })
              }
              placeholder="Name"
            />
            DOB
            <input
              onChange={text =>
                this.setState({ values: { ...values, DOB: text } })
              }
              placeholder="MM/DD/YYYY"
            />
            Sex
            <input
              onChange={text =>
                this.setState({ values: { ...values, sex: text } })
              }
            />
            <br />
            <button onClick={this.submitPatient()}>Submit</button>
          </form>
        </>
      );
    }

    if (type === "users") {
      return (
        <>
          <h3>Adding a new User:</h3>
          <form>
            Name
            <input
              onChange={text =>
                this.setState({ values: { ...values, name: text } })
              }
              placeholder="Name"
            />
            <select>
              <option
                onChange={() =>
                  this.setState({ values: { ...values, userType: "staff" } })
                }
              >
                Staff
              </option>
              <option
                onChange={() =>
                  this.setState({
                    values: { ...values, userType: "transporter" }
                  })
                }
              >
                Transporter
              </option>
            </select>
            Phone Number
            <input
              onChange={text =>
                this.setState({ values: { ...values, phoneNumber: text } })
              }
              placeholder="123-456-7890"
            />
            Username
            <input
              onChange={text =>
                this.setState({ values: { ...values, username: text } })
              }
            />
            Initial Password(Defaults to 'Password)
            <input
              onChange={text =>
                this.setState({ values: { ...values, password: text } })
              }
            />
            <br />
            <button type="submit" onClick={ () => this.submitUser()}>Submit</button>
          </form>
        </>
      );
    }

    if (type === "appointments") {
      return (
        <>
          <h3>Adding a new Appointment:</h3>
          <form>
            Date
            <DatePicker
              onChange={date =>
                this.setState({ values: { ...values, startDate: date } })
              }
              selected={values.startDate}
            />
            Time
            <input
              onChange={text =>
                this.setState({ values: { ...values, time: text } })
              }
              placeholder="24:00"
            />
            Location
            <input
              onChange={text =>
                this.setState({ values: { ...values, location: text } })
              }
            />
            <br />
            <button onClick={this.submitAppointment()}>Submit</button>
          </form>
        </>
      );
    }
  }
}
