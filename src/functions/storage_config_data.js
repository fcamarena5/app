import { MMKV } from 'react-native-mmkv'
import Toast from 'react-native-toast-message';


export const storage = new MMKV()

// - Stores the configuration data into the internal storage.
export function saveData (values) {
    try {
        // Create notifications
        if (!values.ssid) {
            Toast.show({
                type: 'error',
                text1: 'SSID is required',
                position: 'bottom'
            });
            return;
        }
        if (!values.url) {
            Toast.show({
                type: 'error',
                text1: 'Server URL is required',
                position: 'bottom'
            });
            return;
        }
        storage.set('url', values.url);
        if (!values.port) {
            Toast.show({
                type: 'error',
                text1: 'Server port is required',
                position: 'bottom'
            });
            return;
        }
        storage.set('port', values.port);
        // Storage the new values
        storage.set('ssid', values.ssid);
        if (values.password) {
            storage.set('password', values.password);
        } else {
            storage.set('password', '');
        }
        Toast.show({
            type: 'success',
            text1: 'Config data updated successfully',
            position: 'bottom'
        });
        return;
    } catch (e) {
        console.log('error save data: ', e);
        Toast.show({
            type: 'error',
            text1: 'There was an error',
            position: 'bottom'
        });
        return;
    }
}

export function initConfigData() {
    try {
        if (read_value('server') == null) {
            storage.set('url', 'http://192.168.18.7/');
        }
        else if (read_value('port') == null) {
            storage.set('port', 8000);
        }
    } catch (e) {
        console.log('error init config data: ', e);
    }
}

// - Returns the configuration data from the internal storage.
export function getData(item) {
    try {
        if (item === 'ssid') {
            return storage.getString('ssid');
        }
        else if (item === 'password') {
            return storage.getString('password');
        }
        else if (item == 'url') {
            return storage.getString('url');
        }
        else if (item == 'port') {
            return storage.getString('port');
        }
    } catch (e) {
        console.log('error get data: ', e);
    }
}