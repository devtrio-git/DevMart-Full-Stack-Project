import AuthService from "./auth.service";

export default class ApiProvider {

    static getHeaders() {
        let token = AuthService.getAuthToken();
        let headers = {}
        if (token) {
            headers["Authorization"] = `Bearer ${token}`
        }
        return headers;
    };
}