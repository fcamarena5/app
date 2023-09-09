import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Button } from "@react-native-material/core";
import { DataTable } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faBars } from '@fortawesome/free-solid-svg-icons';

import { getObjectDetectedDevices } from '../functions/storage_devices';
import { Device } from '../functions/class_device';


class ShowMACScreen extends Component {

    state = {
      detected_devices: getObjectDetectedDevices()
    }

    getColor(ssid) {
      let device = new Device(ssid);
      if (device.config_status == 'true') {
        return 'green';
      } else {
        return 'red';
      }
    }
    
    render() {
      return (
        <View style={style.container}>
          <View style={style.container_row_title}>
            <Button
              title={props => <FontAwesomeIcon icon={ faAngleLeft } {...props} color={'black'} size={20} />}
              onPress={() => this.props.navigation.goBack()}
              style={style.button_back}
            />
            <Button
              title={props => <FontAwesomeIcon icon={ faBars } {...props} color={'black'} size={20} />}
              onPress={() => this.props.navigation.openDrawer()}
              style={style.button_sidebar}
            />
          </View>
          <View style={{height: 20}} />
          <Text style={style.title}>{'Mac addresses'}</Text>
          <Text style={{color: 'green', fontSize: 18}}>MAC address</Text>
          <View style={{height: 20}} />
          <ScrollView>
            <DataTable style={style.table}>
              <DataTable.Header>
                <DataTable.Title>SSID</DataTable.Title>
                <DataTable.Title>MAC/BSSID</DataTable.Title>
              </DataTable.Header>
              {this.state.detected_devices.map((p, i) => (
                <DataTable.Row key={p}>
                  <DataTable.Cell>{this.state.detected_devices[i][0]}</DataTable.Cell>
                  <DataTable.Cell><Text style={{color: this.getColor(this.state.detected_devices[i][0])}}>{this.state.detected_devices[i][3]}</Text></DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable> 
          </ScrollView>   
        </View>
      )
  }
}
export default ShowMACScreen

const style = StyleSheet.create({
    container: {
      marginTop: 0,
      padding: 20,
      backgroundColor: 'white',
      height: '100%'
    },
    container_row: {
      width: '100%',
      padding: 10,
      alignSelf: "center",
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white'
    },
    table: {
      width: '120%',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    title: {
      fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
      alignSelf: 'center',
      fontFamily: 'sans-serif-condensed',
      alignSelf: 'flex-start'
    },
    button_back: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      borderTopStartRadius: 30,
      borderTopEndRadius: 30,
      borderBottomStartRadius: 30,
      borderBottomEndRadius: 30,
      elevation: 10,
      height: 35,
      width: 35,
      alignSelf: 'flex-start'
    },
    container_row_title: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white',
    },
    button_sidebar: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      borderTopStartRadius: 30,
      borderTopEndRadius: 30,
      borderBottomStartRadius: 30,
      borderBottomEndRadius: 30,
      elevation: 10,
      height: 40,
      width: 40,
    },
  })