import React from "react";
import ReactTable from "react-table";

import { ReactComponent as EditIcon } from "./assets/baseline-edit-24px.svg";
import { ReactComponent as DeleteIcon } from "./assets/baseline-delete-24px.svg";

export default class PatientTable extends React.Component {
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