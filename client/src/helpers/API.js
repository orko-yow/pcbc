import axios from "axios";
import { getAccessToken, logout } from "./Auth";
import Config from "./Config";

const API = axios.create({
  baseURL: `${Config.host}/api/`,
  responseType: "json"
});

const getParams = (optionParam) => {
    const authHeader = {
        headers: {
            Authorization: 'Bearer ' + getAccessToken()
        }
    };
    if (optionParam) {
        return {
            ...optionParam,
            ...authHeader
        };
    } else {
        return authHeader;
    }
};

export const getAllBackups = async () => {
    let backups = await API.get('backups', getParams()).catch((error) => {
        let errorCode = error.response.status;
        if (errorCode === 401) {
            // clear the auth
            logout();
        }
    });
    return backups ? backups.data: [];
};

export const createBackups = async (setCode, token) => {
    let backups = await API.post('backups', { setCode: setCode }, getParams());
    return backups.data;
};

export const removeBackup = async (backupId, token) => {
    let removedBackup = await API.delete('backups/' + backupId, getParams());
    return removedBackup.data;
};

export const searchCards = async (query, token) => {
    let cards = await API.get('cards', getParams({
        params: query
    }));
    return cards.data;
};