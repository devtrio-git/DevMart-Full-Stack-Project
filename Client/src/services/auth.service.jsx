import StorageService from "./storage.service";

export default class AuthService {
    static setAuthToken(token) {
        if (!token) return;
        StorageService.token.set(token)
    }

    static getAuthToken() {
        return StorageService.token.get() || null;
    }
}