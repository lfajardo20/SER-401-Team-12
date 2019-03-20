import React from "react";
import ReactTable from "react-table";

import "react-table/react-table.css"

export default class DataTables extends React.Component {
    state = {
        fetchedData: []
    }
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if(this.props.type !== prevProps.type) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const url = "https://jsonplaceholder.typicode.com/posts";//TODO get/create AWS API
        let params = {
            body: {
                type: this.props.type,
            },
            method: "POST",
        }
        fetch(url, params)
        .then(data=>{return data.json()})
        .then(result => {
            this.setState({fetchedData: [result]});
            console.log(result);
        });
    }

    render() {
        return (
            <>
            {JSON.stringify(this.state.fetchedData)}
            <ReactTable data={this.state.fetchedData} columns={testColumns} />
            </>
        );
    }
}


const testColumns = [
    {
        accessor: "id",
        Header: "ID",
    }, 
    {
        accessor: "hello",
        Header: "Testing",
    }
]