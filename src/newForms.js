import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class NewForms extends React.Component {
    state = {
        values: {
            startDate: new Date()
        },
    }

    submitPatient = () => {

    }

    submitUser = () => {
        
    }

    submitAppointment = () => {
        
    }

    render() {
        const {type} = this.props;
        const {values} = this.state;

        if(!type)
            return null;//don't render if previous fields not selected

        if(type === "patients") {
            return (
                <>
                <h3>
                    Adding a new Patient:
                </h3>
                <form>
                    Name
                    <input onChange={(text) => this.setState({values: {...values, name: text}})}
                    placeholder="Name">
                    </input>
                    DOB
                    <input onChange={(text) => this.setState({values: {...values, DOB: text}})}
                    placeholder="MM/DD/YYYY">
                    </input>
                    Sex
                    <input onChange={(text) => this.setState({values: {...values, sex: text}})}>
                    </input>
                    <br/>
                    <button onClick={this.submitPatient()}>
                        Submit
                    </button>
                </form>
                </>
            )
        }

        if(type === "users") {      
            return (
                <>
                <h3>
                    Adding a new User:
                </h3>
                <form>
                    Name
                    <input onChange={(text) => this.setState({values: {...values, name: text}})}
                    placeholder="Name">
                    </input>
                    <select>
                        <option onChange={() => this.setState({values: {...values, userType: "staff"}})}>
                        Staff
                        </option>
                        <option onChange={() => this.setState({values: {...values, userType: "transporter"}})}>
                        Transporter
                        </option>
                    </select>
                    Phone Number
                    <input onChange={(text) => this.setState({values: {...values, phoneNumber: text}})}
                    placeholder="123-456-7890">
                    </input>
                    Username
                    <input onChange={(text) => this.setState({values: {...values, username: text}})}>
                    </input>
                        Initial Password(Defaults to 'Password)
                    <input onChange={(text) => this.setState({values: {...values, password: text}})}>
                    </input>
                    <br/>
                    <button onClick={this.submitUser()}>
                        Submit
                    </button>
                </form>
                </>
            )
        }
        
        if(type === "appointments") {      
            return (
                <>
                <h3>
                    Adding a new Appointment:
                </h3>
                <form>
                    Date
                    <DatePicker
                    onChange={(date) => this.setState({values: {...values, startDate: date}})}
                    selected={values.startDate}
                    />
                    Time
                    <input onChange={(text) => this.setState({values: {...values, time: text}})}
                    placeholder="24:00">
                    </input>
                    Location
                    <input onChange={(text) => this.setState({values: {...values, location: text}})}>
                    </input>
                    <br/>
                    <button onClick={this.submitPatient()}>
                        Submit
                    </button>
                </form>
                </>
            );    
        }
    }
}