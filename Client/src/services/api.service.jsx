import axios from 'axios';
import ApiProvider from './api.provider';
import { baseUrl } from './constant';

export default class ApiService {
    static async _get(url, params = {}) {
        try {
            let api_url = baseUrl + url;
            const response = await axios.get(api_url, {
                headers: ApiProvider.getHeaders(),
                params,
            });
            return response.data;
        } catch (error) {
            console.log(error?.response, 'axios err check');
            const errorMessage = error?.response?.data?.message || "Failed to fetch data";
            console.error("Failed to fetch data:", errorMessage);
            throw new Error(errorMessage);
        }
    }
}