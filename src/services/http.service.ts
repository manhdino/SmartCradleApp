import axios, {AxiosInstance, AxiosRequestConfig, Method} from 'axios';
import {ACCESS_TOKEN_KEY, SERVER_HOST} from '@/configs/constant.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IHttpRequest {
  url: string;
  params?: any;
  data?: any;
  method: Method;
}

export class HttpService {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: SERVER_HOST,
      timeout: 30000,
    });

    this.http.interceptors.request.use(
      async config => {
        const headers: any = config.headers;
        const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        return {...config, headers: config.headers};
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  async request<T>({url, params, data, method}: IHttpRequest): Promise<T> {
    const config: AxiosRequestConfig = {
      url,
      method,
      params,
      data,
    };

    const response = await this.http.request(config);

    return response.data as T;
  }
}

export default new HttpService();
