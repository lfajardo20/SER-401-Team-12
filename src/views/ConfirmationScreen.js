import React, { Component } from "react";
import { FlatList, ActivityIndicator, Text, View, StyleSheet, AppRegistry, Button} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";


//Export ConfirmationScreen so App.js can call it for navigation
export default class ConfirmationScreen extends React.Component 
{
    state = {
        id:null,
        loc:null,
        isLoading: null
    }
    
    confirmationObj = {
        id:null
    }
    
   constructor(props)
   {
       //Get objects from previous view
        super(props)
        this.state.id = this.props.navigation.getParam('id');
        this.state.loc = this.props.navigation.getParam('loc');
        
        this.confirmationObj.id = this.state.id;
        
        this.state.isLoading = true;
        //Do the server post to get data
        this.doPostConfirmation();
    }

    doPostConfirmation()
    {
        return fetch('https://8svpahmpbc.execute-api.us-west-1.amazonaws.com/Test',
            { method: 'POST',headers: 
            { Accept: 'application/json','Content-Type': 'application/json',}
            , body: JSON.stringify(this.confirmationObj)})
          .then((response) => response.json())
          .then((responseJson) => {

            this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
            //Testing functions
        });
      })
      .catch((error) =>{ console.error(error);});
    }
    
    doPostConfirmationTrue()
    {      
        this.confirmationObj.location = this.state.loc;
        alert(JSON.stringify(this.confirmationObj));
        return fetch('https://k634ch08g9.execute-api.us-west-1.amazonaws.com/test',
            { method: 'POST',headers: 
            { Accept: 'application/json','Content-Type': 'application/json',}
            , body: JSON.stringify(this.confirmationObj)})
          .then((response) => response.json())
          .then((responseJson) => {

            this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function()
        {   
            //Testing functions go here
        });
        })
          .catch((error) =>{
            console.error(error);
          });
        
        // Change screen after post        
    } 
  
  render() 
  {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
           <ActivityIndicator/>
        </View>
      )
    }
    
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>     
            <View style={{flex: 1, alignItems: 'center'}}> 
                <Text>{JSON.stringify(this.state.dataSource)}</Text>
                <Button
                  title="Yes"
                  onPress={() => this.doPostConfirmationTrue()}
                />
            </View>            
            <View style={{flex: 1, alignItems: 'center'}}>
                <Button
                  title="No"
                  onPress={() => this.props.navigation.navigate('Scanner')}
                />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})