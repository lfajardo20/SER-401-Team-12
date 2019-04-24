import React from "react";
import ReactTable from "react-table";

import Modal from "./modal";

import { ReactComponent as EditIcon } from "./assets/baseline-edit-24px.svg";
import { ReactComponent as DeleteIcon } from "./assets/baseline-delete-24px.svg";

export default class UserTable extends React.Component {
    state = {
        activeModal: undefined,
    }

    render() {
        const {
            userName,
            userType,
            fullname,
            email,
            phoneNumber,
        } = this.state;
        return (
            <>
                <Modal active={this.state.activeModal === "Delete"} onClose={this.closeModal}>
                    <button onClick={this.deleteRow}>Delete</button>
                    <button onClick={this.closeModal}>Cancel</button>
                </Modal>  
                <Modal active={this.state.activeModal === "Edit"} onClose={this.closeModal}>
                <div style={{display: "flex", flexDirection: "column"}}>
                        <p className="label">Username</p>
                        <input onChange={(event) => this.setState({userName: event.target.value})} value={userName} />

                        <p className="label">User Type</p>
                        <select onChange={(event) => this.setState({userType: event.target.value})} value={userType}>
                            <option value="staff">Staff</option>
                            <option value="transporter">Transporter</option>
                        </select>

                        <p className="label">Full Name</p>
                        <input onChange={(event) => this.setState({fullname: event.target.value})} value={fullname}/>
                       
                        <p className="label">Email</p>
                        <input onChange={(event) => this.setState({email: event.target.value})} value={email}/>

                        <p className="label">Phone Number</p>
                        <input onChange={(event) => this.setState({phoneNumber: event.target.value})} value={phoneNumber}/>
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
        fetch("https://6m2i2xewv6.execute-api.us-west-1.amazonaws.com/beta",
        { 
            method: "DELETE",
            body: JSON.stringify({id: this.state.rowInfo.accountId}),
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
            userName: this.state.userName,
            userType: this.state.userType,
            fullname: this.state.fullname,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            accountId: this.state.accountId,
        }

        fetch("https://6m2i2xewv6.execute-api.us-west-1.amazonaws.com/beta",
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
                        userName: row.userName,
                        userType: row.userType,
                        fullname: row.fullname,
                        email: row.email? row.email : "",
                        phoneNumber: row.phoneNumber,
                        accountId: row.accountId,
                    });
                }
                else if (column.Header === "Delete") {
                    this.setState({activeModal: "Delete", accountID: row.accountId});
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
        accessor: "userName",
        Header: "Username",
    },
    {
        accessor: "userType",
        Header: "Type",
    },
    {
        accessor: "fullname",
        Header: "Full Name",
    },
    {
        accessor: "email",
        Header: "Email",
    },
    {
        accessor: "phoneNumber",
        Header: "Phone Number",
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