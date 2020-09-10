import axios from "axios";
import { getAccessToken, logout } from "./Auth";
import Config from "./Config";

const API = axios.create({
  baseURL: `${Config.host}/api/`,
  responseType: "json"
});

export const getAllBackups = async () => {
    let backups = await API.get('backups', {
        headers: {
            Authorization: 'Bearer ' + getAccessToken()
        }
    }).catch((error) => {
        let errorCode = error.response.status;
        if (errorCode === 401) {
            // clear the auth
            logout();
        }
    });
    return backups ? backups.data: [];
};

export const createBackups = async (setCode, token) => {
    let backups = await API.post('backups', { setCode: setCode }, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken()
        }
    });
    return backups.data;
};

export const removeBackup = async (backupId, token) => {
    let removedBackup = await API.delete('backups/' + backupId, {
        headers: {
            Authorization: 'Bearer ' + getAccessToken()
        }
    });
    return removedBackup.data;
};

export const searchCards = async (query, token) => {
    let cards = await API.get('cards', {
        params: query,
        headers: {
            Authorization: 'Bearer ' + getAccessToken()
        }
      });
    return cards.data;
};