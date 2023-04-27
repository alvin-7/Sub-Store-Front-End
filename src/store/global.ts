import { defineStore } from 'pinia';
import { useEnvApi } from '@/api/env';

const envApi = useEnvApi();

export const useGlobalStore = defineStore('globalStore', {
  state: (): GlobalStoreState => {
    const hasAuth = Boolean(window.localStorage.getItem("auth"))
    return {
      hasAuth: hasAuth,
      isLoading: true,
      isFlowFetching: true,
      fetchResult: false,
      bottomSafeArea: 0,
      isDarkMode: false,
      env: {},
    };
  },
  getters: {},
  actions: {
    setAuth(auth: boolean) {
      this.hasAuth = auth;
      window.localStorage.setItem("auth", String(auth))
    },
    setBottomSafeArea(height: number) {
      this.bottomSafeArea = height;
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    setFlowFetching(isFlowFetching: boolean) {
      this.isFlowFetching = isFlowFetching;
    },
    setFetchResult(fetchResult: boolean) {
      this.fetchResult = fetchResult;
    },
    setDarkMode(isDarkMode: boolean) {
      this.isDarkMode = isDarkMode;
    },
    async setEnv() {
      const res = await envApi.getEnv();
      if (res.data.status === 'success') {
        this.env = res.data.data;
      }
    },
  },
});
