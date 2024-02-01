import {LoginDto, RegisterDto, User} from '@/features/auth/auth.model';
import {ACCESS_TOKEN_KEY} from '@/configs/constant.config';
import httpService from '@/services/http.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class AuthService {
  async login(data: LoginDto): Promise<{accessToken: string}> {
    const url = '/api/auth/login';
    const response = await httpService.request<any>({
      url,
      method: 'POST',
      data,
    });

    const {token} = response;

    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);

    return {accessToken: token};
  }

  async register(data: RegisterDto): Promise<{accessToken: string}> {
    const url = '/api/services/app/Account/Register';
    const response = await httpService.request<any>({
      url,
      method: 'POST',
      data,
    });

    const {token} = response;

    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);

    return {accessToken: token};
  }

  async getMe(): Promise<User> {
    const url = '/api/user/getMe';
    const result = await httpService.request<{data: User}>({
      url,
      method: 'GET',
    });

    return result.data;
  }
}

export default new AuthService();
