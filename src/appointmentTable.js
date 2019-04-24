import React from "react";
import ReactTable from "react-table";
import DatePicker from "react-datepicker";

import Modal from "./modal";

import { ReactComponent as EditIcon } from "./assets/baseline-edit-24px.svg";
import { ReactComponent as DeleteIcon } from "./assets/baseline-delete-24px.svg";

export default class AppointmentTable extends React.Component {
    state = {
        activeModal: undefined,
    }

    render() {
        const{
            mrNumber,
            accountNum,
            date,
            location,
        } = this.state;

        return (
            <>
                <Modal active={this.state.activeModal === "Delete"} onClose={this.closeModal}>
                    <button onClick={this.deleteRow}>Delete</button>
                    <button onClick={this.closeModal}>Cancel</button>
                </Modal>  
                <Modal active={this.state.activeModal === "Edit"} onClose={this.closeModal}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p className="label">MR Number</p>
                        <input onChange={(event) => this.setState({mrNumber: event.target.value})} value={mrNumber} />

                        <p className="label">Account Number</p>
                        <input onChange={(event) => this.setState({accountNum: event.target.value})} value={accountNum} />

                        <p className="label">Date + Time</p>
                        <DatePicker
                            selected={date}
                            timeInputLabel="Time:"
                            onChange={(value) => this.setState({date: value})}
                            showTimeInput
                            dateFormat="YYYY-MM-dd hh:mm:ss"
                        />

                        <p className="label">Location</p>
                        <input onChange={(event) => this.setState({location: event.target.value})} value={location}/>
                        <br/>

                        <button onClick={this.modifyRow}>Update</button>
                        <button onClick={this.closeModal}>Cancel</button>
                    </div>
                </Modal> 
            <ReactTable columns={columns} data={this.props.data} getTdProps={this.getTdProps}/>
            </>
        )
    }

    closeModal = () => {
        this.setState({activeModal: null})
    }

    deleteRow = async () => {
        fetch("https://ng8rh0c7n0.execute-api.us-west-1.amazonaws.com/beta",
        { 
            method: "DELETE",
            body: JSON.stringify({apptNumber: this.state.apptNumber}),
        })
        .then(data=> console.log(data))
        .then(() =>
            this.props.refetch()
        ) 
        .then(() =>
        this.closeModal()
        );
    }

    modifyRow = async () => {
        let info = {
            mrNumber: this.state.mrNumber,
            accountNum: this.state.accountNum,
            date: new Date(this.state.date).toISOString(),
            mainSurgeonID: this.state.mainSurgeonID,
            location: this.state.location,
            apptNumber: this.state.apptNumber,
        }

        fetch("https://ng8rh0c7n0.execute-api.us-west-1.amazonaws.com/beta",
        { 
            method: "PUT",
            body: JSON.stringify(info),
        })
        .then(data=> console.log(data))
        .then(() =>
            this.props.refetch()
        )
        .then(() =>
            this.closeModal()
        );
    }

    //function passed to react table that determines props such as click handlers
    getTdProps = (state, rowInfo, column, instance) => {
        return {
            onClick: (e, handleOriginal) => {
                //do nothing for empty rows
                if(!rowInfo) {
                    return;
                }

                const row = rowInfo.original;
                if(column.Header === "Edit") {
                    this.setState({
                        activeModal: "Edit",
                        mrNumber: row.mrNumber,
                        accountNum: row.accountNum,
                        date: new Date(row.date),
                        mainSurgeonID: row.mainSurgeon,
                        location: row.location,
                        apptNumber: row.apptNumber,
                    });
                    //mrNumber, accountNum, date, mainSurgeonID, location, apptNumber
                }
                else if (column.Header === "Delete") {
                    this.setState({activeModal: "Delete", apptNumber: row.apptNumber});
                }
                // triggers default events like expanding SubComponents and pivots.
                if (handleOriginal) {
                    handleOriginal();
                }
            }
        };
    }
}

const columns = [
    {
        accessor: "accountNum",
        Header: "Account#",
    },
    {
        accessor: "location",
        Header: "Location",
    },
    {
        accessor: "date",
        Header: "Time",
        Cell: (data) => (
            <span> 
                {new Date(data.original.date).toLocaleString()}
            </span>
        )
    },
    {
        Header: "Edit",
        Cell: <EditIcon/>
    },
    {
        Header: "Delete",
        Cell: <DeleteIcon/>
    }
];