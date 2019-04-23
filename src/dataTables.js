import React from "react";
import AccountTable from "./accountTable";
import PatientTable from "./patientTable";
import AppointmentTable from "./appointmentTable";

import "react-table/react-table.css"

export default class DataTables extends React.Component {
    render() {
        const {accounts, patients, appointments, type} = this.props;

        if(!accounts || !patients || !appointments) {
            return null;
        }

            return (
                <div>
                    {type === "patients" ? <PatientTable data={patients} refetch={this.props.fetches.patients}/> :
                    type === "appointments" ? <AppointmentTable data={appointments} refetch={this.props.fetches.appointments}/> :
                    <AccountTable data={accounts} refetch={this.props.fetches.accounts}/>}
                </div>
            );
        }
    }