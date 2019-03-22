import React from "react";
import ReactTable from "react-table";

export default class AppointmentTable extends React.Component {
    render() {
        return <ReactTable columns={columns} data={this.props.data}/>
    }
}


const columns = [
    {
        accessor: "ID",
        Header: "id",
    },
    {
        accessor: "location",
        Header: "Location",
    },
    {
        accessor: "date",
        Header: "Time",
    },
];