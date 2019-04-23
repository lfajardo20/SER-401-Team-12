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
        return (
        <>
            <Modal active={this.state.activeModal === "Delete"} onClose={this.closeModal}>
                <button onClick={this.deleteRow}>Delete</button>
                <button onClick={this.closeModal}>Cancel</button>
            </Modal>  
            <Modal active={this.state.activeModal === "Edit"} onClose={this.closeModal}>
                Stuff
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
            body: JSON.stringify({id: this.state.rowInfo.id}),
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
                if(column.Header === "Edit") {
                    this.setState({activeModal: "Edit", rowInfo: rowInfo.original});
                }
                else if (column.Header === "Delete") {
                    this.setState({activeModal: "Delete", rowInfo: rowInfo.original});
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
        accessor: "id",
        Header: "ID",
    },
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