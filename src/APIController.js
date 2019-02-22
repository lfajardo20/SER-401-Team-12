import React, { Component } from "react";
import { Alert, View, Text, Vibration, StyleSheet } from "react-native";
import { Permissions } from "expo";

export class APIController
{
    constructor(ID) 
    { 
       this.id = ID;
    }
}
    
    //For getting patient data for transporter confirmation
    function patientDataPOST() 
    {
        
        fetch('https://8svpahmpbc.execute-api.us-west-1.amazonaws.com/Test', {
        method: 'POST',
        headers: 
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(this.id),
        }).then((response) => response.json())
        .then((responseJson) => {
          return setupPatientData(responseJson);
        })
        .catch((error) => {
          console.error(error);
        }); 
    }
    
    //Post that sends sms
    function confirmationPOST() 
    {
        
        fetch('https://8svpahmpbc.execute-api.us-west-1.amazonaws.com/Test', {
        method: 'POST',
        headers: 
        {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(this.id),
        }).then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        }); 
        
    }
    
    //setup return to display on one line of the app
    function setupPatientData(data)
    {
        return("<Text>"+ data.firstName + " " + data.lastName + " " + data.age + "</Text>")
    }
    
}