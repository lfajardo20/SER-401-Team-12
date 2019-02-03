import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Animated
} from 'react-native';
class ForgotPasswordController extends Component {
    /**
     * Default props
     */
    static defaultProps = {
        backgroundColor :"white",
        titleText:"Forgot Password",
        submitText:"Send",
        placeHolderText:"Email Address"
    };

    constructor(props) {
        super(props);
        this.state = {
           email:""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.bottomView,{backgroundColor:this.props.backgroundColor}]}>
                    <TouchableOpacity style={styles.btnClose} activeOpacity={0.6} onPress={() => this.btnClosePress()}>
                        <Image source={Images.close}/>
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>{this.props.titleText}</Text>
                    <View style={styles.starView}>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputText} placeholder={this.props.placeHolderText}
                            multiline={false} placeholderTextColor={'#3c3c3c'} autoCapitalize={'none'} keyboardType={'email-address'} autoCorrect={false} underlineColorAndroid={'transparent'} onChangeText={(email) => this.setState({email})} value={this.state.email}></TextInput>
                        </View>
                        <TouchableOpacity style={styles.btnCancel} activeOpacity={0.6} onPress={() => this.btnSubmitPress()}>
                            <Text style={styles.textCancel} numberOfLines={1}>
                            {this.props.submitText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default ForgotPasswordController