import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Crypto from "crypto-js";

export default class NewForms extends React.Component {
  constructor() {
    super();
    this.submitUser = this.submitUser.bind(this);
    this.submitAppointment = this.submitAppointment.bind(this);
    this.submitPatient = this.submitPatient.bind(this);
  }
  state = {
    startDate: new Date()
  };

  /*
   *The functions below (submitPatient, submitUser, submitAppointments) has been inspired
   * by Medium post titled How to handle forms with just React by everdimension
   * link: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
   * Also, used a for loop created by them to facilitate the data being sent to
   * our API.
   * link: https://gist.github.com/everdimension/87228e9ebab82b84afcdc7794fde3bfd
   */
  submitAppointment(event) {
    event.preventDefault();
    const form = event.target;
    const data = {};
    const url = "https://ng8rh0c7n0.execute-api.us-west-1.amazonaws.com/beta/";

    for (let element of form.elements) {
      if (element.tagName === "BUTTON") {
        continue;
      }
      data[element.name] = element.value;
    }

    data["date"] += " " + data.time + ":00";
    delete data["time"];

    console.log("JSON Below.");
    console.log(JSON.stringify(data));

    //TODO: Fetch to the API
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
      })
      .catch(error => {
        console.log(error);
      });

    window.location.reload();
  }

  submitUser(event) {
    event.preventDefault();
    const form = event.target;
    const data = {};
    const url = "https://6m2i2xewv6.execute-api.us-west-1.amazonaws.com/beta";

    for (let element of form.elements) {
      if (element.tagName === "BUTTON") {
        continue;
      }
      data[element.name] = element.value;
    }

    let salt = Math.floor(Math.random() * 10000); //generates random number between 0-10,000 as a salt
    let hash = Crypto.SHA256(data.password.toString() + "" + salt.toString()); //using a salted, hashed password to prepare for actual security

    data["salt"] = salt;
    data["passwordHash"] = hash.toString();
    delete data["password"];

    console.log(JSON.stringify(data));

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
      })
      .catch(error => {
        console.log(error);
      });

    window.location.reload();
  }

  submitPatient(event) {
    event.preventDefault();
    const form = event.target;
    const data = {};
    const url = "https://agz8z029wg.execute-api.us-west-1.amazonaws.com/beta/";

    for (let element of form.elements) {
      if (element.tagName === "BUTTON") {
        continue;
      }
      data[element.name] = element.value;
    }

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
      })
      .catch(error => {
        console.log(error);
      });

    window.location.reload();
  }

  render() {
    const { type } = this.props;
    //const { username, phoneNumber, password, userType, name } = this.state;

    if (!type) return null; //don't render if previous fields not selected

    if (type === "patients") {
      return (
        <>
          <h3>Adding a new Patient:</h3>
          <form onSubmit={this.submitPatient}>
            First Name
            <input
              id="firstname"
              name="firstname"
              placeholder="First Name"
              required
            />
            Last Name
            <input
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              required
            />
            Age
            <input id="age" name="age" />
            Sex
            <select id="sex" name="sex">
              <option value="M" id="sex" name="sex">
                M
              </option>
              <option value="F" id="sex" name="sex">
                F
              </option>
            </select>
            <br />
            <button type="submit">Submit</button>
          </form>
        </>
      );
    }

    if (type === "users") {
      return (
        <>
          <h3>Adding a new User:</h3>
          <form onSubmit={this.submitUser}>
            Name
            <input
              type="text"
              placeholder="Name"
              id="fullname"
              name="fullname"
            />
            <select id="userType" name="userType">
              <option value="staff" id="userType" name="userType">
                Staff
              </option>
              <option value="transporter" id="userType" name="userType">
                Transporter
              </option>
            </select>
            Phone Number
            <input
              type="text"
              placeholder="123-456-7890"
              id="phoneNumber"
              name="phoneNumber"
            />
            Username
            <input type="text" id="userName" name="userName" required />
            Initial Password(Defaults to 'Password')
            <input type="text" id="password" name="password" required />
            <br />
            <button>Submit</button>
          </form>
        </>
      );
    }

    if (type === "appointments") {
      return (
        <>
          <h3>Adding a new Appointment:</h3>
          <form onSubmit={this.submitAppointment}>
            Date
            <input
              type="date"
              id="date"
              name="date"
              min="2019-01-01"
              max="2022-12-31"
              required
            />
            Time
            <input id="time" name="time" placeholder="24:00" required />
            mrNumber
            <input id="mrNumber" name="mrNumber" required />
            Account Number
            <input id="accountNum" name="accountNum" required />
            Location
            <select id="location" name="location">
              <option value="Main Preop" id="location" name="location">
                Main Preop
              </option>
              <option value="East PACU" id="location" name="location">
                East PACU
              </option>
              <option value="East Preop" id="location" name="location">
                East Preop
              </option>
            </select>
            <br />
            <button>Submit</button>
          </form>
        </>
      );
    }
  }
}
