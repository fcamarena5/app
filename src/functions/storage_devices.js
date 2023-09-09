import Toast from 'react-native-toast-message';
import { storage } from './storage_config_data';
import { getNearDevices } from './networking';
import { Device } from './class_device';
import { device_recently_connected_to_server } from './datetime';
import { saveLogError } from './log_errors';


// - Returns a list with the SSIDs of the already detected devices.
export function getListDetectedDevices () {
    try {
        const storage_keys = storage.getAllKeys();
        let  device_keys = new Array();
        storage_keys.forEach(key => {
            if (key.startsWith('ESP32-')) {
                device_keys.push(key);
            }
        });
        return device_keys;
    } catch (e) {
        console.error('error get list detected devices: ', e);
        saveLogError('error get list detected devices: ' + e);
    }
}

// - Delete a detected device from internal storage
export function deleteDevice(ssid) {
    try {
        storage.delete(ssid);
    } catch (e) {
        console.error('error delete device: ', e);
        saveLogError('error delete device: ' + e);
    }
}

// - Delete the detected devices data from the internal storage.
export function deleteConfigProgress() {
    try {
        const detected_devices = getListDetectedDevices();
        detected_devices.forEach(device => {
            storage.delete(device);
        })
        Toast.show({
            type: 'success',
            text1: 'Config progress has been deleted',
            position: 'bottom'
        });
    } catch (e) {
        console.error('delete config progress: ', e);
        saveLogError('delete config progress: ' + e);
        Toast.show({
            type: 'error',
            text1: 'There was an error',
            position: 'bottom'
        });
    }
}

// - Returns an object with the data of all the detected devices.
// - Object format is a list. Example: [[ssid1, mac1, config_status1, signal1], [..., ..., ..., ...]]
// - Used to render the table of the 'Run configuration' tab.
export function getObjectDetectedDevices () {
    try {
        let list_detected_devices = getListDetectedDevices();
        console.log(list_detected_devices)
        let object_detected_devices = new Array;
        list_detected_devices.forEach(element => {
            let device = new Device(element);
            object_detected_devices.push([device.ssid, device.getIconStatus(), device.getIconFromSignal(), device.mac])
        });
        return object_detected_devices;
    } catch (e) {
        console.error('error get object detected devices: ', e);
        saveLogError('error get object detected devices: ' + e);
        return [];
    }
}

export function getObjectNearDevices () {
    try {
        let list_detected_devices = getListDetectedDevices();
        let object_near_devices = new Array;
        list_detected_devices.forEach(element => {
            let device = new Device(element);
            if (device.signal != -1) {
                let near_device = {
                    type: device.getDeviceType(),
                    ssid: device.ssid,
                    mac: device.mac,
                    signal: device.getIconFromSignal()
                };
                object_near_devices.push(near_device);
            }
        });
        return object_near_devices;
    } catch (e) {
        console.error('error get object near devices: ', e);
        saveLogError('error get object near devices: ' + e);
        return [];
    }
}

export function getObjectConectivityServer () {
    try {
        const list_detected_devices = getListDetectedDevices();
        let object_devices_server = new Array();
        for (var i in list_detected_devices) {
            let device = new Device(list_detected_devices[i]);
            if (device.getCustomer() != null) {
                if (device_recently_connected_to_server(device.getLastConnection()) == true) {
                    var color = 'lightgreen';
                } else {
                    var color = 'lightcoral';
                }
                object_devices_server.push([color, device.ssid, device.getDeviceType(), device.getCustomer(), device.getLocation(), device.getDeviceName(), device.getLastConnection(), device.getVersion()]);
                
            } else {
                object_devices_server.push(['lightgrey', list_detected_devices[i], device.getDeviceType(), '', '', '', device.getLastConnection(), device.getVersion()]);
            }
        }
        return object_devices_server;
    } catch (e) {
        console.error('error get object conectivity server: ', e);
        saveLogError('error get object conectivity server: ' + e);
        return [];
    }
}

// - Store into the internal storage the new detected devices with their data.
// - If a near device has been already registered. Wi-Fi signal strength is updated to memory.
// - For detected devices that are not close, signal is set to -1 (no signal).
export async function storeNearDevices (discover_devices) {
    try {
        let wifi_list = await getNearDevices(); // All the close Wi-Fi networks
        let list_detected_devices = getListDetectedDevices();
        let list_near_devices = new Array(); // Array to include the close ductFITs
        let list_new_devices = new Array(); // Array to included the new detected ductFITs

        for (var i in wifi_list) {
            if (wifi_list[i].SSID.startsWith('ESP32-')) {
                list_near_devices.push(wifi_list[i].SSID);
                // Add near device to detected devices
                if (!list_detected_devices.includes(wifi_list[i].SSID) && discover_devices) {
                    // Adjust the format of the BSSID
                    var mac = wifi_list[i].BSSID;
                    mac = mac.toUpperCase();
                    mac = mac.replace(/:/g, '');
                    // Store the device
                    list_new_devices.push(wifi_list[i].SSID);
                    let device = {
                        ssid: wifi_list[i].SSID,
                        mac: mac,
                        config_status: 'unknown',
                        signal: wifi_list[i].level
                    }
                    storage.set(wifi_list[i].SSID, JSON.stringify(device));
                } else { // Near device is already registered. Update the signal
                    if (discover_devices) {
                        let device = new Device(wifi_list[i].SSID);
                        device.updateSignal(wifi_list[i].level);
                    }
                }
            }
        }
        // Update signal to not close detected devices
        for (var i in list_detected_devices) {
            if (!list_near_devices.includes(list_detected_devices[i])) {
                let device = new Device(list_detected_devices[i]);
                device.updateSignal(-1);
            }
        }
        // If there are no new devices
        if (list_new_devices.length == 0 && discover_devices) {
            Toast.show({
                type: 'info',
                text1: 'There are no new near devices',
                position: 'bottom'
            });
        }
    } catch (e) {
        console.error('error store near devices: ', e);
        saveLogError('error store near devices: ' + e);
        Toast.show({
            type: 'error',
            text1: 'There was an error',
            position: 'bottom'
        });
    }
}


