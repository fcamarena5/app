import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "@react-native-material/core";


class OnboardingScreen extends Component {
    
    showMenu() {
        this.bottomActionMenu.show();
    }

    render () {
        return(
            <View style={style.container}>
                <Text style={style.title}>{'Welcome to the app!'}</Text>
                <Text style={style.description}>{'This app will help you to automatically configure and control your devices. But firstly, log in or register:'}</Text>
                <View style={{height: '5%'}} />
                <Image
                    source={require('../../assets/img/uned.jpg')}
                    resizeMode='cover'
                    style={style.image}
                ></Image>
                <View style={{height: '5%'}} />
                <View style={style.container_row}>
                    <Button
                        title={'Log in'}
                        onPress={() => this.props.navigation.navigate('login')}
                        variant='outlined'
                        style={style.button_login}
                    />
                    <Button
                        title={'Register'}
                        onPress={() => this.props.navigation.navigate('register')}
                        style={style.button_register}
                    />
                </View>
            </View>
        )
    }
}
export default OnboardingScreen;

const style = StyleSheet.create({
    container: {
        marginTop: 0,
        padding: 20,
        height: '100%',
        backgroundColor: 'white',
        flex: 1
    },
    container_row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: 10
    },
    description: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 'auto',
        height: '40%',
    },
    button_login: {
        width: '45%',
        height: 50,
        justifyContent: 'center',
    },
    button_register: {
        width: '45%',
        height: 50,
        justifyContent: 'center'
    },
    button_change_language: {
        marginTop: 10,
        backgroundColor: 'white'
    },
    button_manual: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'black',
        width: '70%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 20,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
    },
    button_disabled: {
        backgroundColor: 'lightgrey',
        width: '70%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 20,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
    },
    small_image: {
        width: 35,
        height: 35,
        paddingRight: 50
    },
    text_language: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: '40%'
    },
})