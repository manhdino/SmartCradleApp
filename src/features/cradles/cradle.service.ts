import httpService from '@/services/http.service';
import {Cradle, CreateCradleDto} from './cradle.model';

export class CradleService {
  async getListCradle(): Promise<Cradle[]> {
    const url = '/api/cradle/all';
    const result = await httpService.request<{data: Cradle[]}>({
      url,
      method: 'GET',
    });

    return result.data;
  }

  async createCradle(cradle: CreateCradleDto): Promise<Cradle> {
    const url = '/api/cradle';
    const result = await httpService.request<{data: Cradle}>({
      url,
      method: 'POST',
      data: cradle,
    });

    return result.data;
  }
}

export default new CradleService();
