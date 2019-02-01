import React, { Component } from "react";
import { FlatList, ActivityIndicator, Text, View, StyleSheet, AppRegistry, Button} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

//import APIController from "./src/views/APIController";

//Export ConfirmationScreen so App.js can call it for navigation
export default class ConfirmationScreen extends React.Component 
{ 
   constructor(props){
    super(props);
    this.id = {"id" : this.props.navigation.getParam('id').replace(/^0+/, '')};

    this.state ={ isLoading: true}
    this.ComponentDidMount(this.id)
  }

    static navigationOptions = {
        title: 'Confirmation',
      };    
    
    ComponentDidMount(id){
        return fetch('https://8svpahmpbc.execute-api.us-west-1.amazonaws.com/Test',
            { method: 'POST',headers: 
            { Accept: 'application/json','Content-Type': 'application/json',}
            , body: JSON.stringify(this.id)})
          .then((response) => response.json())
          .then((responseJson) => {

            this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
            console.log(JSON.stringify(this.id))
            console.log(this.state.dataSource);
        });

      })
      .catch((error) =>{
        console.error(error);
      });
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
            <View style={styles.container}>
                <FlatList
                data = {this.state.dataSource}
                  renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                />
            </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                <Button
                  title="Yes"
                  onPress={() => this.props.navigation.navigate('Scanner')}
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
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})