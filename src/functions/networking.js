import Toast from 'react-native-toast-message';
import WifiManager from "react-native-wifi-reborn";
import axios from 'axios';
import { Device } from "./class_device";


// - Asks to the user to activate the Wi-Fi if it is disabled and actives it.
export async function checkWiFiEnabled() {
    try {
        // Enable Wi-Fi if it is not ready
        const wifi_enabled = await WifiManager.isEnabled();
        if (wifi_enabled == false) {
            WifiManager.setEnabled(true);
        }
    } catch (e) {
        console.error('error check wifi enabled: ', e);
    }
}

// - Configure a determined device with the configuration data set on the "Set Data" screen.
// - Returns a log with the result of the configuration of the device:
//      * Configured successfully
//      * Wrong login password
//      * Error during the configuration
// - This log is shown on the "Run Configuration" screen.
export async function configure(device, config_data) {
    try {
        var is_logged = true;
        var is_configured = false;
        var log = '';
        // Connect to device if we are not connected
        if (await WifiManager.getCurrentWifiSSID() != device) {
            await WifiManager.connectToProtectedSSID(device, '11131719', false);
            //await sleep(1000);
        }
        // Send a POST request with the config data if succesful login
        if (is_logged) {
            const ssid = encodeURIComponent(config_data.ssid);
            const password = encodeURIComponent(config_data.password);
            const url = encodeURIComponent(config_data.url);
            const port = encodeURIComponent(config_data.port);
            const username = encodeURIComponent(config_data.username);

            // Performs the configuration request
            const response_config = await axios.get(
                'http://10.10.254.1/save',
                {
                  ssid: config_data.ssid,
                  password: config_data.password,
                  url: config_data.url,
                  port: config_data.port,
                  username: config_data.username
                },{headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: [(data) => {
                  const formData = new URLSearchParams();
                  for (const key in data) {
                    formData.append(key, data[key]);
                  }
                  return formData.toString();
                }],
                }
              );

            // Manage the response from the configuration POST request
            if (response_config.status == 200) {
                is_configured = true;    
                console.log('Configured');
            }
        }

        // Update the config status of the device
        let updated_device = new Device(device);
        updated_device.updateConfigStatus(is_configured);
        // Return the result
        if (is_logged && is_configured) {
            log += 'Configured successfully!' + '\n';
        } else {
            log += 'There was an error' + '\n';
        }
        return log; 
    } catch (e) {
        // Update the config status of the device
        let updated_device = new Device(device);
        updated_device.updateConfigStatus(false);
        if (e.toString().includes('Not connected or connecting')) {
            Toast.show({
                type: 'error',
                text1: 'Enable the Wi-Fi',
                position: 'bottom'
            });
            return null;
        } else {
            console.error('error config: ', e);
            return ('There was an error' + ': ' + e + '\n');
        }
    }
}

// - Delay for a specific period of time.
export function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}



// - Returns true if customer Wi-Fi network has access to the internet.
export async function checkInternetAccess() {
    try {
        const response_internet_access = await fetch('https://www.google.com');
        await sleep(1000);
        if (response_internet_access.status == 200) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error('error check internet access: ', e);
        return false;
    }
}

// - Returns an object with all the info of the nearby Wi-Fi networks.
export async function getNearDevices() {
    try {
        const object_wifi_networks = await WifiManager.loadWifiList();
        return object_wifi_networks;
    } catch (e) {
        console.error('error get near devices: ', e);
    }
}
