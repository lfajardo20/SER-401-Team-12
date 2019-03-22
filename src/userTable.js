import React from "react";
import ReactTable from "react-table";

export default class UserTable extends React.Component {
    render() {
        return <ReactTable columns={columns} data={this.props.data}/>
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
        accessor: "fullName",
        Header: "Full Name",
    },
    {
        accessor: "email",
        Header: "Email",
    },
    {
        accessor: "phoneNumber",
        Header: "Phone Number",
    }
];