import { PermissionsAndroid } from 'react-native';
import Toast from 'react-native-toast-message';
import { DevSettings } from 'react-native';
import axios from 'axios';

import { storage } from './storage_config_data';
import { checkInternetAccess } from './networking';


export function preLogin(values) {
  try {
    if (!values.username) {
      Toast.show({
        type: 'error',
        text1: 'Name is required',
        position: 'bottom'
      });
      return;
    } else if (values.password) {
      Toast.show({
        type: 'error',
        text1: 'Password is required',
        position: 'bottom'
      });
      return;
    }
    login(values.username, values.credentials_password);
  } catch (e) {
    console.error('error prelogin: ', e);
  }
}

export function preRegister(values) {
  try {
    if (!values.name) {
      Toast.show({
        type: 'error',
        text1: 'Name is required',
        position: 'bottom'
      });
      return;
    } else if (!values.email) {
      Toast.show({
        type: 'error',
        text1: 'Email is required',
        position: 'bottom'
      });
      return;
    } else if (!values.password) {
      Toast.show({
        type: 'error',
        text1: 'Password is required',
        position: 'bottom'
      });
      return;
    }
    // Validate the email
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(values.email) === false) {
      Toast.show({
        type: 'error',
        text1: 'Type a valid email address',
        position: 'bottom'
      });
      return;
    }
    register(values.name, values.email, values.password);
  } catch (e) {
    console.error('error preregister: ', e);
  }
}

async function login(username, password) {
  try {
    // Performs the POST request.
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post(
      'http://192.168.18.7:80/api/login/',
      {
        username: username,
        password: password,
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
    // Manages the responses.
    if (response.status == 201) {
      Toast.show({
        type: 'success',
        text1: 'Right credentials!',
        position: 'bottom'
      });
      storage.set('username', username);
      storage.set('login_password', password);
      setUserLogged();
    } else {
      Toast.show({
        type: 'error',
        text1: 'There was an error',
        position: 'bottom'
      });
    }
  } catch (e) {
    console.error('error login: ', e);
    Toast.show({
      type: 'error',
      text1: 'There was an error',
      position: 'bottom'
    });
  }
}

async function register(username, email, password) {
  try {
    // Check if there is internet access
    if (!await checkInternetAccess()) {
      Toast.show({
        type: 'error',
        text1: 'No internet connection',
        position: 'bottom'
      });
    }
    // Performs the POST request.
    const response = await axios.post(
      'http://192.168.18.7:80/api/register/',
      {
        username: username,
        email: email,
        password: password,
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
    // Manages the responses.
    if (response.status == 201) {
        storage.set('username', username);
        storage.set('email', email);
        storage.set('password', password);
        Toast.show({
          type: 'success',
          text1: 'Successful registration!',
          position: 'bottom'
        });
        setUserLogged();
    } else {
      if (await checkInternetAccess()) {
        Toast.show({
          type: 'error',
          text1: 'There was an error',
          position: 'bottom'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'No internet connection',
          position: 'bottom'
        });
      }
    }
  } catch (e) {
    console.error('error register: ', e);
  }
}

// - Function to request the location permission.
// - Returns true if the request has been accepted.
export async function requestLocationPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Permissions',
        'message': 'App needs access to the location permission in order to connect with ductFITs by Wi-Fi'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      console.log("location permission denied");
     return false;
    }
  } catch (e) {
    console.warn('error request location permission: ', e);
    return false;
  }
}

export function userIsLogged() {
  try {
    const user_is_logged = storage.getBoolean('logged');
    if (user_is_logged == true) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

export function setUserLogged() {
  try {
    // Changes user status to logged.
    storage.set('logged', true);
    // Restarts the app.
    restart();
  } catch (e) {
    console.error('error set user logged: ', e);
  }
}

const restart = () => {
  DevSettings.reload();
};

export function logOut() {
  try {
    storage.set('logged', false);
    restart();
  } catch (e) {
    console.error('error log out: ', e);
  }
}