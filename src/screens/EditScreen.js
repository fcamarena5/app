import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button } from "@react-native-material/core";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { DataTable } from 'react-native-paper';

import { getObjectDetectedDevices, deleteDevice } from '../functions/storage_devices';
import { Device } from '../functions/class_device';


class EditScreen extends Component {

    state = {
      detected_devices: getObjectDetectedDevices()
    }

    ActionChangeStatus(index) {
      try {
        // Get the selected device
        const detected_devices = getObjectDetectedDevices();
        const ssid = detected_devices[index][0];
        // Get the data for the select device
        let device = new Device(ssid);
        console.log(device)
        // Change the status
        if (device.config_status == 'true') {
          device.updateConfigStatus('unknown');
        }
        else if (device.config_status == 'false') {
          device.updateConfigStatus('true');
        }
        else if (device.config_status == 'unknown') {
          device.updateConfigStatus('false');
        }

        // Refresh the screen content
        this.setState({
          detected_devices: getObjectDetectedDevices()
        })
      } catch(e) {
        Toast.show({
          type: 'error',
          text1: 'There was an error',
          position: 'bottom'
        });
      }
    }

    ActionDeleteDevice(index) {
      try {
        // Get the selected device
        const detected_devices = getObjectDetectedDevices();
        const ssid = detected_devices[index][0];
        // Delete the detected device
        deleteDevice(ssid);
        // Refresh the screen content
        this.setState({
          detected_devices: getObjectDetectedDevices()
        })
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'There was an error',
          position: 'bottom'
        });
      }
      }
    
    render() {
      const { t } = this.props;
      return (
        <View style={style.container}>
          <ScrollView>
            <DataTable style={style.table}>
              <DataTable.Header>
                <DataTable.Title style={{flex: 4}}>SSID</DataTable.Title>
                <DataTable.Title style={{flex: 4}}>{'Configured'}</DataTable.Title>
                <DataTable.Title style={{flex: 1}}></DataTable.Title>
                <DataTable.Title style={{flex: 1}}></DataTable.Title>
              </DataTable.Header>
              {this.state.detected_devices.map((p, i) => (
                <DataTable.Row key={p}>
                  <DataTable.Cell style={{flex: 4}}>{this.state.detected_devices[i][0]}</DataTable.Cell>
                  <DataTable.Cell style={{flex: 1, paddingRight: 10}}>{this.state.detected_devices[i][1]}</DataTable.Cell>
                  <DataTable.Cell style={{flex: 0, paddingRight: 10}}>
                      <Button 
                          title={props => <FontAwesomeIcon icon={ faPenToSquare } {...props}  />}
                          onPress={() => {this.ActionChangeStatus(i)}}
                          style={style.button_edit}>
                      </Button>
                  </DataTable.Cell>
                  <DataTable.Cell style={{flex: 0}}>
                      <Button 
                          title={props => <FontAwesomeIcon icon={ faTrashCan } {...props} color={'black'} />}
                          onPress={() => {this.ActionDeleteDevice(i)}}
                          style={style.button_delete}>
                      </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>   
        </View>
      )
  }
}
export default EditScreen;

const style = StyleSheet.create({
    container: {
      marginTop: 0,
      padding: 0,
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
    input: {
      margin: 10,
    },
    button: {
      backgroundColor: '#000000',
      height: 60,
      width: 60,
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20
    },
    button_edit: {
      backgroundColor: 'black',
      justifyContent: 'center',
      borderTopStartRadius: 0,
      borderTopEndRadius: 0,
      borderBottomStartRadius: 0,
      borderBottomEndRadius: 0
    },
    button_delete: {
      backgroundColor: 'white',
      justifyContent: 'center',
      borderTopStartRadius: 0,
      borderTopEndRadius: 0,
      borderBottomStartRadius: 0,
      borderBottomEndRadius: 0
    },
    table: {
      width: '100%',
      justifyContent: 'center',
      backgroundColor: 'white'
    }
  })