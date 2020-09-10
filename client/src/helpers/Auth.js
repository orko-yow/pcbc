import axios from "axios";
import Cookies from "js-cookie";
import Config from "./Config.js";

const baseURL = `${Config.host}/auth/`;
const Auth = axios.create({
  baseURL: baseURL,
  responseType: "json"
});

const getToken = () => {
	const token = Cookies.get("access-token");
	if (token === "") {
		return false;
	}
	return token;
}

export const login = async (userName, secret) => {
	let authResponse = await Auth.post('login', { username: userName, secret: secret })
		.catch(function (err) {
			console.log(err);
		});
	console.log(authResponse.data);
	if (authResponse.data.status === 200) {
		const token = authResponse.data.accessToken;
		Cookies.set("access-token", token, { expires: 1 });
		console.log(token);
		return true;
	} else {
		Cookies.set("access-token", "");
	}
    return false;
};

export const logout = () => {
	Cookies.set("access-token", "");
	return true;
};

export const checkIsLoggedIn = () => {
	return getToken()!==false;
}

export const getAccessToken = () => {
	return getToken();
}