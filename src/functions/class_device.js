import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons/faWifi';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons/faCircleQuestion';

import { saveLogError } from './log_errors';
import { storage } from './storage_config_data';

export class Device {
    
    constructor(ssid) {
        this.string_data_device = storage.getString(ssid);
        this.json_data_device = JSON.parse(this.string_data_device);
        this.ssid = ssid;
        this.mac = this.json_data_device.mac;
        this.config_status = this.json_data_device.config_status;
        this.signal = this.json_data_device.signal;
        this.submit_status = this.json_data_device.submit_status;
    }

    updateConfigStatus(is_configured) {
        try {
            let updated_device = {
                ssid: this.ssid,
                mac: this.mac,
                config_status: is_configured.toString(),
                signal: this.signal,
                submit_status: this.submit_status
            }
            storage.set(this.ssid, JSON.stringify(updated_device));
        } catch (e) {
            console.error('error update config status: ', e);
            saveLogError('error update config status: ' + e);
        }
    }

    updateMAC(new_mac) {
        try {
            let updated_device = {
                ssid: this.ssid,
                mac: new_mac,
                config_status: this.config_status,
                signal: this.signal,
                submit_status: this.submit_status
            }
            storage.set(this.ssid, JSON.stringify(updated_device));
        } catch (e) {
            console.error('error update mac: ', e);
            saveLogError('error update mac: ' + e);
        }
    }

    updateSignal(new_signal) {
        try {
            let updated_device = {
                ssid: this.ssid,
                mac: this.mac,
                config_status: this.config_status,
                signal: new_signal,
                submit_status: this.submit_status
            }
            storage.set(this.ssid, JSON.stringify(updated_device));
        } catch (e) {
            console.error('error update signal: ', e);
            saveLogError('error update signal: ' + e);
        }
    }

    getIconStatus() {
        try {
            if (this.config_status == 'true') {
                return <FontAwesomeIcon icon={ faCircleCheck } color={ 'green' }/>;
            }
            else if (this.config_status == 'false') {
                return <FontAwesomeIcon icon={ faCircleXmark } color={ 'red' }/>;
            }
            else {
                return <FontAwesomeIcon icon={ faCircleQuestion } color={ 'orange' }/>;
            }
        } catch (e) {
            console.error('error get icon status: ', e);
            saveLogError('error get icon status: ' + e);
        }
    }

    getIconFromSignal() {
        try {
            if (this.signal >= -65 && this.signal != -1) {
                return <FontAwesomeIcon icon={ faWifi } color={'green'}/>;
            }
            else if (this.signal > -80 && this.signal < -65) {
                return <FontAwesomeIcon icon={ faWifi } color={'orange'}/>;
            }
            else if (this.signal <= -80) {
                return <FontAwesomeIcon icon={ faWifi } color={'red'}/>;
            }
            else if (this.signal == -1) {
                return <FontAwesomeIcon icon={ faWifi } color={'lightgrey'}/>;
            }
            else {
                return <FontAwesomeIcon icon={ faWifi } color={'black'}/>;
            }
        } catch (e) {
            console.error('error get color from signal: ', e);
            saveLogError('error get color from signal: ' + e);
        }
    }
}