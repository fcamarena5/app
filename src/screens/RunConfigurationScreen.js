import React, { Component } from 'react';
import Toast from 'react-native-toast-message';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Button } from "@react-native-material/core";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { DataTable } from 'react-native-paper';

import { storage } from '../functions/storage_config_data';
import { deleteConfigProgress, getObjectDetectedDevices, getListDetectedDevices, storeNearDevices } from '../functions/storage_devices';
import { checkWiFiEnabled, configure } from '../functions/networking.js';
import { requestLocationPermission } from '../functions/permissions.js';
import { Device } from '../functions/class_device';


class RunConfigurationScreen extends Component {

    state = {
      logs: '',
      detected_devices: getObjectDetectedDevices()
    }

    updateLogs(log) {
      this.setState({
        logs: this.state.logs + log
      })
    }

    resetLogs() {
      this.setState({
        logs: ''
      })
    }
    
    // - If app has location permissions:
    //    > Discover near devices and save them into internal storage.
    //    > Update the table content with the networks data.
    async ActionScanDevices() {
      if (requestLocationPermission()) {
        await checkWiFiEnabled();
        await storeNearDevices(true);
        this.setState({
          detected_devices: getObjectDetectedDevices()
        })
      } else {
        this.updateLogs('Please accept the location permission.');
      }
    }

    async ActionUpdateSignal() {
      if (requestLocationPermission()) {
        await checkWiFiEnabled();
        await storeNearDevices(false);
        this.setState({
          detected_devices: getObjectDetectedDevices()
        })
      } else {
        this.updateLogs('Please accept the location permission.');
      }
    }

    // - Detele the configuration progress, update the table and reset the logs.
    ActionDeleteConfigProgress() {
      deleteConfigProgress();
      this.setState({
        detected_devices: []
      })
      this.resetLogs();
    }

    async ActionStartConfiguration() {
      // Reset the logs
      this.resetLogs();
      var new_logs = '';
      // Scan for new devices
      await checkWiFiEnabled();
      await storeNearDevices(false);
      // Refresh the screen content
      this.setState({
        detected_devices: getObjectDetectedDevices()
      })
      // Get the configuration data
      let config_data = {
        ssid: storage.getString('ssid'),
        password: storage.getString('password'),
        url: storage.getString('url'),
        port: storage.getString('port'),
        username: storage.getString('username'),
        email: storage.getString('email')
      }
      // Get list of detected devices
      let list_detected_devices = getListDetectedDevices();
      // Iterate configuration over them
      var number_devices_to_configure = 0;
      for (var i in list_detected_devices) {
        let device = new Device(list_detected_devices[i]);
        // Configure only the close non-configured devices
        if (device.config_status != 'true' && device.signal != -1) {
          this.updateLogs('- Configuring ' + list_detected_devices[i] + '...\n');
          new_logs = await configure(list_detected_devices[i], config_data);
          if (new_logs != null) {
            this.updateLogs(new_logs);
          }
          number_devices_to_configure += 1;
        }
        // Refresh the screen content
        this.setState({
          detected_devices: getObjectDetectedDevices()
        })
      }
      // Show alert if there are no left near devices to configure
      if (number_devices_to_configure == 0) {
        Toast.show({
          type: 'info',
          text1: 'There are no left near devices to configure',
          position: 'bottom'
        });
      }
    }
    
    render() {
      const { t } = this.props;
      return (
        <View style={style.container}>
          <View style={style.container_row}>
            <Button
                title={props => <FontAwesomeIcon icon={ faTrashCan } {...props} color={'black'} />}
                onPress={() => {this.ActionDeleteConfigProgress()}}
                style={style.button_delete}
            />
            <View style={{width: '100%', flexDirection: 'row', paddingLeft: 40, alignSelf: 'center'}}>
              <Button
                  title={props => <FontAwesomeIcon icon={ faArrowsRotate } {...props} color={'white'} />}
                  onPress={() => {this.ActionUpdateSignal()}}
                  style={{
                    backgroundColor: 'black', height: 50, width: '40%', justifyContent: 'center', alignItems: 'center',
                    borderTopStartRadius: 30, borderTopEndRadius: 0, borderBottomStartRadius: 30, borderBottomEndRadius: 0, elevation: 10
                }}
              />
              <Button
                  title={props => <FontAwesomeIcon icon={ faMagnifyingGlass } {...props} />}
                  onPress={() => {this.ActionScanDevices()}}
                  style={style.button_scan}
              />
            </View>
          </View>
          <ScrollView style={style.scroll}>
            <DataTable style={style.table}>
              <DataTable.Header>
                <DataTable.Title style={{flex: 2}}>SSID</DataTable.Title>
                <DataTable.Title style={{flex: 1, marginLeft: -30}}>{'Configured'}</DataTable.Title>
                <DataTable.Title style={{flex: 1}}>{'Signal'}</DataTable.Title>
              </DataTable.Header>
              {this.state.detected_devices.map((p, i) => (
                <DataTable.Row key={p}>
                  <DataTable.Cell style={{flex: 2}}>{this.state.detected_devices[i][0]}</DataTable.Cell>
                  <DataTable.Cell style={{flex: 1}}>{this.state.detected_devices[i][1]}</DataTable.Cell>
                  <DataTable.Cell style={{flex: 1}}>{this.state.detected_devices[i][2]}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
          <ScrollView style={style.scroll_logs}>
            <Text>
              {this.state.logs}
            </Text>
          </ScrollView>
          <Button
            title={'Start configuration'}
            onPress={() => {this.ActionStartConfiguration()}}
            style={style.button_run}
          />
        </View>
      )
  }
}
export default RunConfigurationScreen;

const style = StyleSheet.create({
    container: {
      marginTop: 0,
      padding: 20,
      height: '100%',
      backgroundColor: 'white'
    },
    container_row: {
      width: '90%',
      padding: 10,
      alignSelf: "center",
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    input: {
      margin: 10,
    },
    button_delete: {
      backgroundColor: 'gainsboro',
      height: 50,
      width: '20%',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopStartRadius: 30,
      borderTopEndRadius: 30,
      borderBottomStartRadius: 30,
      borderBottomEndRadius: 30,
      elevation: 10
    },
    button_scan: {
      backgroundColor: 'black',
      height: 50,
      width: '40%',
      justifyContent: 'center',
      borderTopStartRadius: 0,
      borderTopEndRadius: 30,
      borderBottomStartRadius: 0,
      borderBottomEndRadius: 30,
      elevation: 10
    },
    button_run: {
      backgroundColor: 'black',
      width: "90%",
      height: 50,
      alignSelf: "center",
      justifyContent: 'center',
      marginBottom: '0%',
      borderTopStartRadius: 0,
      borderTopEndRadius: 0,
      borderBottomStartRadius: 0,
      borderBottomEndRadius: 0
    },
    table: {
      width: '120%',
      justifyContent: 'center'
    },
    scroll: {
      height: '45%',
      marginBottom: 20
    },
    scroll_logs: {
      height: '12%',
      marginBottom: 18,
      borderRadius: 10,
      backgroundColor: 'white',
      elevation: 10,
      padding: 10
    }
  })