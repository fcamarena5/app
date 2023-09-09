import { Formik } from 'formik';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from "@react-native-material/core";

import { saveData, getData } from '../functions/storage_config_data';


class SetDataScreen extends Component {

    state = {
        stored_ssid: getData('ssid'),
        stored_password: getData('password'),
        stored_url: getData('url'),
        stored_port: getData('port')
    }

    render () {
        return (
            <Formik
                initialValues={{
                ssid: this.state.stored_ssid,
                password: this.state.stored_password,
                url: this.state.stored_url,
                port: this.state.stored_port
                }}
                onSubmit={saveData}
            >
                {({handleChange, setFieldValue, handleSubmit, values}) => (
                    <View style={style.container}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 4}}>
                                <TextInput
                                    label='SSID'
                                    variant='standard'
                                    placeholder={'Type the SSID of the Wi-Fi'}
                                    onChangeText={handleChange('ssid')}
                                    style={style.input}
                                    value={values.ssid}
                                />
                            </View>
                        </View>
                        <TextInput
                            label='Password'
                            variant='standard'
                            placeholder={'Type the password of the Wi-Fi'}
                            onChangeText={handleChange('password')}
                            style={style.input}
                            value={values.password}
                        />
                        <TextInput
                            label='Server'
                            variant='standard'
                            placeholder={'URL of the server'}
                            onChangeText={handleChange('url')}
                            style={style.input}
                            value={values.url}
                        />
                        <TextInput
                            label='Port'
                            variant='standard'
                            placeholder={'Port of the server'}
                            onChangeText={handleChange('port')}
                            style={style.input}
                            value={values.port}
                        />
                        <Button title={'save data'} onPress={handleSubmit} style={style.button} />
                    </View>
                )}
            </Formik>
        )
    }
}
export default SetDataScreen;

const style = StyleSheet.create({
    container: {
        marginTop: 0,
        padding: 20,
        height: '100%',
        backgroundColor: 'white'
    },
    container_row: {
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container_row_checks: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
      margin: 5,
    },
    input_ssid: {
        margin: 8,
        width: '80%'
      },
    button: {
      backgroundColor: '#000000',
      width: "90%",
      height: 50,
      alignSelf: "center",
      marginTop: 45,
      justifyContent: 'center',
      marginBottom: '10%',
      borderTopStartRadius: 0,
      borderTopEndRadius: 0,
      borderBottomStartRadius: 0,
      borderBottomEndRadius: 0
    },
    button_search_wifi: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderColor: 'black',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
        borderWidth: 1,
    },
    button_wifi_network: {
        backgroundColor: 'lightblue',
        color: 'black',
        width: '80%',
        height: '10%',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    switch: {
        alignSelf: "center",
        transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }]
    },
    text: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center'
    },
    title: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    },
    scroll: {
        height: '60%',
        marginBottom: 100
      },
  })