import React from "react";
import NewForms from "./newForms";
import DataTables from "./dataTables";

export default class FormBody extends React.Component {
    state = {
        accounts: [],
        patients: [],
        appointments: [],
    }

    async componentDidMount() {
        this.fetchAccounts();
        this.fetchPatients();
        this.fetchAppointments();
    }

    fetchAccounts = async () => {
        const url = "https://6m2i2xewv6.execute-api.us-west-1.amazonaws.com/beta";
        fetch(url)
        .then(data=>{return data.json()})
        .then(result => {
            this.setState({accounts: result});
        });
    }

    fetchPatients = async () => {
        const url = "https://agz8z029wg.execute-api.us-west-1.amazonaws.com/beta";
        fetch(url)
        .then(data=>{return data.json()})
        .then(result => {
            this.setState({patients: result});
        });
    }

    fetchAppointments = async () => {
        const url = "https://ng8rh0c7n0.execute-api.us-west-1.amazonaws.com/beta";
        fetch(url)
        .then(data=>{return data.json()})
        .then(result => {
            this.setState({appointments: result});
        });
    }

    render() {
        const {type, activity} = this.props;
        const {accounts, patients, appointments} = this.state;

        if(!type || !activity) {
            return null;//don't render if previous fields not selected
        }

        if(activity === "new") {
            return (
                <NewForms type={type} />
            )
        }
        

        return (
            <>
                <DataTables
                    type={type}
                    accounts={accounts}
                    patients={patients} 
                    appointments={appointments}
                    fetches={{
                        appointments: this.fetchAppointments,
                        patients: this.fetchPatients,
                        accounts: this.fetchAccounts,
                    }}/>
            </>
        )
    }
}