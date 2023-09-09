import { storage } from './storage_config_data';


export function saveLogError(log) {
    try {
        const keys = storage.getAllKeys();
        if ('errors' in keys) {
            last_logs = storage.getString('errors');
            storage.set('errors', last_logs + log + '\n');
        } else {
            storage.set('errors', log + '\n');
        }
    } catch (e) {
        console.error('error save log error: ', e);
    }
}