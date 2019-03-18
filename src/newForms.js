import React from "react";

export default class NewForms extends React.Component {
    state = {
        values: {},
    }
    render() {
        const {type} = this.props;
        const {values} = this.state;

        if(!type)
            return null;//don't render if previous fields not selected

        if(type === "patients") {
            return (
                <>
                <h3>
                    Adding a new Patient:
                </h3>
                <form>
                    Name
                    <input onChange={(text) => this.setState({values: {...values, name: text}})}
                    placeholder="Name">
                    </input>
                    DOB
                    <input onChange={(text) => this.setState({values: {...values, DOB: text}})}
                    placeholder="MM/DD/YYYY">
                    </input>
                </form>
                </>
            )
        }

        if(type === "users") {      
            return ("TODO");    
        }
        
        if(type === "appointments") {      
            return ("TODO");    
        }
    }
}