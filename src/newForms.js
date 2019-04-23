import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Crypto from "crypto-js";

export default class NewForms extends React.Component {
  constructor() {
    super();
    this.submitUser = this.submitUser.bind(this);
  }
  state = {
    username: "",
    phoneNumber: "",
    password: "",
    userType: "",
    name: "",
    startDate: new Date(),
  };

  submitPatient = () => {};

  /*
  *The function below has been inspired by Medium post title 
  *How to handle forms with just React by everdimension
  * link: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
  * Also, used a for loop created by them to facilitate the data being sent to
  * our API.
  * link: https://gist.github.com/everdimension/87228e9ebab82b84afcdc7794fde3bfd
  */
  submitUser(event) {
    event.preventDefault();
    const form = event.target;
    const data = {};
    const url = 'https://6m2i2xewv6.execute-api.us-west-1.amazonaws.com/beta';

    for (let element of form.elements) {
      if (element.tagName === 'BUTTON') { continue; }
      data[element.name] = element.value;
    } 

    let salt = Math.floor(Math.random() * 10000); //generates random number between 0-10,000 as a salt
    let hash = Crypto.SHA256(data.password.toString() + "" + salt.toString()); //using a salted, hashed password to prepare for actual security

    data["salt"] = salt;
    data["passwordHash"] = hash.toString();
    delete data["password"];

    console.log(JSON.stringify(data));

    fetch(url, {
      method: 'POST',
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
      console.log(error);
    });
  };

  submitAppointment = () => {};

  render() {
    const { type } = this.props;
    //const { username, phoneNumber, password, userType, name } = this.state;

    if (!type) return null; //don't render if previous fields not selected

    // if (type === "patients") {
    //   return (
    //     <>
    //       <h3>Adding a new Patient:</h3>
    //       <form>
    //         Name
    //         <input
    //           onChange={text =>
    //             this.setState({ values: { ...values, name: text } })
    //           }
    //           placeholder="Name"
    //         />
    //         DOB
    //         <input
    //           onChange={text =>
    //             this.setState({ values: { ...values, DOB: text } })
    //           }
    //           placeholder="MM/DD/YYYY"
    //         />
    //         Sex
    //         <input
    //           onChange={text =>
    //             this.setState({ values: { ...values, sex: text } })
    //           }
    //         />
    //         <br />
    //         <button onClick={this.submitPatient()}>Submit</button>
    //       </form>
    //     </>
    //   );
    // }

    if (type === "users") {
      return (
        <>
          <h3>Adding a new User:</h3>
          <form onSubmit={this.submitUser}>
            Name
            <input type="text"
              placeholder="Name"
              id="fullname"
              name="fullname"
            />
            <select id="userType" name="userType">
              <option value="staff"
                id="userType"
                name="userType"
              >
                Staff
              </option>
              <option value="transporter"
                id="userType"
                name="userType"
              >
                Transporter
              </option>
            </select>
            Phone Number
            <input type="text"
              placeholder="123-456-7890"
              id="phoneNumber"
              name="phoneNumber"
            />
            Username
            <input type="text"
              id="userName"
              name="userName"
              required
            />
            Initial Password(Defaults to 'Password')
            <input type="text"
              id="password"
              name="password"
              required
            />
            <br />
            <button>Submit</button>
          </form>
        </>
      );
    }

    // if (type === "appointments") {
    //   return (
    //     <>
    //       <h3>Adding a new Appointment:</h3>
    //       <form>
    //         Date
    //         <DatePicker
    //           onChange={date =>
    //             this.setState({ values: { ...values, startDate: date } })
    //           }
    //           selected={values.startDate}
    //         />
    //         Time
    //         <input
    //           onChange={text =>
    //             this.setState({ values: { ...values, time: text } })
    //           }
    //           placeholder="24:00"
    //         />
    //         Location
    //         <input
    //           onChange={text =>
    //             this.setState({ values: { ...values, location: text } })
    //           }
    //         />
    //         <br />
    //         <button onClick={this.submitAppointment()}>Submit</button>
    //       </form>
    //     </>
    //   );
    // }
  }
}
