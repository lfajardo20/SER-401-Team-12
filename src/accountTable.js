import React from "react";
import ReactTable from "react-table";

import { ReactComponent as EditIcon } from "./assets/baseline-edit-24px.svg";
import { ReactComponent as DeleteIcon } from "./assets/baseline-delete-24px.svg";

export default class UserTable extends React.Component {
    render() {
        return <ReactTable columns={columns} data={this.props.data} getTdProps={getTdProps}/>
    }
}

//function passed to react table that determines props such as click handlers
const getTdProps = (state, rowInfo, column, instance) => {
    return {
        onClick: (e, handleOriginal) => {

        // triggers default events like expanding SubComponents and pivots.
        if (handleOriginal) {
            handleOriginal();
        }
        }
    };
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