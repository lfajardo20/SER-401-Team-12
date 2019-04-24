import React from "react";
import ReactTable from "react-table";

import Modal from "./modal";

import { ReactComponent as EditIcon } from "./assets/baseline-edit-24px.svg";
import { ReactComponent as DeleteIcon } from "./assets/baseline-delete-24px.svg";

export default class PatientTable extends React.Component {
    state = {
        activeModal: undefined,
    }

    render() {
        const {firstname, lastname, sex, age} = this.state;

        return (
        <>
            <Modal active={this.state.activeModal === "Delete"} onClose={this.closeModal}>
                <button onClick={this.deleteRow}>Delete</button>
                <button onClick={this.closeModal}>Cancel</button>
            </Modal>  
            <Modal active={this.state.activeModal === "Edit"} onClose={this.closeModal}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p className="label">First Name</p>
                    <input onChange={(event) => this.setState({firstname: event.target.value})} value={firstname} />

                    <p className="label">Last Name</p>
                    <input onChange={(event) => this.setState({lastname: event.target.value})} value={lastname} />

                    <p className="label">Sex</p>
                    <input onChange={(event) => this.setState({sex: event.target.value})} value={sex}/>


                    <p className="label">Age</p>
                    <input
                     onChange={(event) => this.setState({age: event.target.value})} value={age} />
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
        fetch("https://agz8z029wg.execute-api.us-west-1.amazonaws.com/beta",
        { 
            method: "DELETE",
            body: JSON.stringify({id: this.state.id}),
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
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            id: this.state.id,
            sex: this.state.sex,
            age: this.state.age,
        }

        fetch("https://agz8z029wg.execute-api.us-west-1.amazonaws.com/beta",
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
                        firstname: row.firstname,
                        lastname: row.lastname,
                        id: row.id,
                        sex: row.sex,
                        age: row.age,
                    });
                }
                else if (column.Header === "Delete") {
                    this.setState({activeModal: "Delete", id: row.id});
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
        Header: "Name",
        id: "name",
        Cell: (data) => (
           <span>
            { data.original.lastname + ", " + data.original.firstname }
            </span>
        )
    },
    {
        accessor: "sex",
        Header: "Sex",
    },
    {
        accessor: "age",
        Header: "Age",
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