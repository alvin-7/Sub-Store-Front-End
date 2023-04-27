import request, {settoken} from '@/api';
import { AxiosPromise } from 'axios';

export function useSettingsApi() {
  return {
    verify: (data: SettingsPostData): AxiosPromise<MyAxiosRes> => {
      return request({
        url: '/api/verify',
        method: 'post',
        data: data
      });
    },
    getSettings: (): AxiosPromise<MyAxiosRes> => {
      return request({
        url: '/api/settings',
        method: 'get',
      });
    },
    setSettings: (data: SettingsPostData): AxiosPromise<MyAxiosRes> => {
      return request({
        url: '/api/settings',
        method: 'patch',
        data,
      });
    },
    syncSettings: (query: 'download' | 'upload'): AxiosPromise<MyAxiosRes> => {
      return request({
        url: '/api/utils/backup?action=' + query,
        method: 'get',
      });
    },
  };
}
