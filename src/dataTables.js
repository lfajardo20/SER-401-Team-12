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
        const url = "https://ich20wj3w4.execute-api.us-west-1.amazonaws.com/table";//TODO get/create AWS API
        fetch(url)
        .then(data=>{return data.json()})
        .then(result => {
            this.setState({fetchedData: result.Data});
            console.log(result);
        });
    }

    render() {
        const {fetchedData} = this.state || {};

        switch(this.props.type) {
            case "patients":
                return <PatientTable data={fetchedData.appointments}/>;
            case "appointments":
                return <AppointmentTable data={fetchedData.appointments}/>;
            case "users":
                return <UserTable data={fetchedData.users}/>;
            default: 
                return null;
        }
    }
}