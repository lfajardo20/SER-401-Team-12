import React from "react";
import ReactTable from "react-table";

export default class PatientTable extends React.Component {
    render() {
        return <ReactTable columns={columns} data={this.props.data}/>
    }
}


const columns = [
    {
        accessor: "name",
        Header: "Name",
    },
    {
        accessor: "sex",
        Header: "Sex",
    },
    {
        accessor: "DOB",
        Header: "DOB",
    },
];