import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { preLogin } from '../functions/permissions';


class LoginScreen extends Component {

    render () {
        return(
            <Formik
                initialValues={{
                    username: '',
                    credentials_password: ''
                }}
                onSubmit={preLogin}
            >
                {({handleChange, handleSubmit, values}) => (
                <View style={style.container}>
                    <Text style={style.title}>{'Log in'}</Text>
                    <View style={style.subcontainer}>
                        <Image
                            source={require('../../assets/img/login.jpg')}
                            resizeMode='stretch'
                            style={style.image}
                        ></Image>
                        <View style={{height: 20}} />
                        <TextInput
                            label={'Username'}
                            onChangeText={handleChange('username')}
                            value={values.username}
                            leading={<FontAwesomeIcon icon={ faUser } color={'black'} size={20} />}
                        />
                        <View style={{height: 20}} />
                        <TextInput
                            label={'Password'}
                            onChangeText={handleChange('credentials_password')}
                            value={values.credentials_password}
                            leading={<FontAwesomeIcon icon={ faLock } color={'black'} size={20} />}
                        />
                        <View style={{height: 50}} />
                        <View style={style.container_row}>
                            <Button
                                title={'Back'}
                                onPress={() => this.props.navigation.goBack()}
                                variant='outlined'
                                style={style.button_back}
                            />
                            <Button
                                title={'Submit'}
                                onPress={handleSubmit}
                                style={style.button_submit}
                            />
                        </View>
                        <View style={{height: 10}} />
                    </View>
                    <Toast refs={(refs) => Toast.setRef(refs)} />
                </View>
                )
                }
            </Formik>
        )
    }
}
export default LoginScreen;

const style = StyleSheet.create({
    container: {
        marginTop: 0,
        padding: 20,
        height: '100%',
        backgroundColor: 'white',
    },
    subcontainer: {
        alignSelf: 'center',
        justifyContent: 'center'
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
        fontSize: 20,
        fontWeight: 'bold'
    },
    button_back: {
        width: '45%',
        height: 50,
        justifyContent: 'center',
        
    },
    button_submit: {
        width: '45%',
        height: 50,
        justifyContent: 'center'
    },
    button_forgot: {
        width: '100%',
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    image: {
        width: 'auto',
        height: '40%',
    },
})