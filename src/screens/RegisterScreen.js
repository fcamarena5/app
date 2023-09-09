import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { preRegister } from '../functions/permissions';


class RegisterScreen extends Component {

    state = {
    }

    render () {
        return(
            <Formik
                initialValues={{
                    email: '',
                    credentials_password: ''
                }}
                onSubmit={preRegister}
            >
                {({handleChange, handleSubmit, values}) => (
                <View style={style.container}>
                    <Text style={style.title}>{'Register'}</Text>
                    <View style={style.subcontainer}>
                        <Image
                            source={require('../../assets/img/register.jpg')}
                            resizeMode='stretch'
                            style={style.image}
                        ></Image>
                        <View style={{height: 10}} />
                        <TextInput
                            label={'Name'}
                            placeholder={'Name'}
                            onChangeText={handleChange('name')}
                            value={values.name}
                            leading={<FontAwesomeIcon icon={ faUser } color={'black'} size={20} />}
                        />
                        <View style={{height: 10}} />
                        <TextInput
                            label={'Email'}
                            placeholder={'email'}
                            onChangeText={handleChange('email')}
                            value={values.email}
                            leading={<FontAwesomeIcon icon={ faEnvelope } color={'black'} size={20} />}
                        />
                        <View style={{height: 10}} />
                        <TextInput
                            label={'Password'}
                            placeholder={'password'}
                            onChangeText={handleChange('password')}
                            value={values.password}
                            leading={<FontAwesomeIcon icon={ faLock } color={'black'} size={20} />}
                        />
                        <View style={{height: 40}} />
                        <View style={style.container_row}>
                            <Button
                                title={'Back'}
                                onPress={() => this.props.navigation.goBack()}
                                variant='outlined'
                                style={style.button_back}
                            />
                            <Button
                                title={'Accept'}
                                onPress={handleSubmit}
                                style={style.button_submit}
                            />
                        </View>
                    </View>
                    <Toast refs={(refs) => Toast.setRef(refs)} />
                </View>
                )
                }
            </Formik>
        )
    }
}
export default RegisterScreen;

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
        paddingBottom: 0
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
        height: '30%',
    },
    dropdown: {
        height: 55,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        backgroundColor: '#eeeeee'
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'black'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16
    }
})