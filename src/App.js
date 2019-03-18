import React, { Component } from 'react';
import './App.css';

import FormBody from "./formBody";

const FormContext = React.createContext();

class App extends Component {
  state = {
    activity: null,
    type: null,
  }
  render() {
    const {activity, type} = this.state;
    return (
      <FormContext.Provider value={{}}>
        <div className="App">
          <h2>
            I want to:
          </h2>
          <div className="buttons">
            <button onClick={()=>this.setState({activity: "new", type: null })}
            className={activity === "new"? "selected": ""}>
            Add New data 
            </button>
            <button onClick={()=>this.setState({activity: "modify", type: null })}
            className={activity === "modify"? "selected": ""}>
              View Existing Data
            </button>      
          </div>

          {activity && //only show type options once action is selected
          <div className="buttons">
            <button onClick={()=>this.setState({type: "users" })}
            className={type === "users"? "selected": ""}>
              User Accounts
            </button>
            <button onClick={()=>this.setState({type: "appointments" })}
            className={type=== "appointments"? "selected": ""}>
              Appointments
            </button>
            <button onClick={()=>this.setState({type: "patients" })}
            className={type === "patients"? "selected": ""}>
              Patients
            </button>         
            </div>
          }

          <FormBody activity={activity} type={type}/>
        </div>
      </FormContext.Provider>
    );
  }
}

export default App;
