import React from "react";
import UserTable from "./userTable";
import PatientTable from "./patientTable";
import AppointmentTable from "./appointmentTable";

import "react-table/react-table.css"

export default class DataTables extends React.Component {
    state = {
        fetchedData: []
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const url = "https://ich20wj3w4.execute-api.us-west-1.amazonaws.com/table";
        fetch(url)
        .then(data=>{return data.json()})
        .then(result => {
            this.setState({fetchedData: result});
            console.log(result);
        });
    }

    render() {
        const {fetchedData} = this.state;
        const {type} = this.props;

        if(!fetchedData) {
            return null;
        }

            return (
                <div>
                    {type === "patients" ? <PatientTable data={fetchedData.patients}/> :
                    type === "appointments" ? <AppointmentTable data={fetchedData.appointments}/> :
                    <UserTable data={fetchedData.staff}/>}
                </div>
            );
        }
    }