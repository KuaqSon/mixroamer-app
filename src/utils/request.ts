import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import getConfig from 'next/config';
import * as AuthService from 'src/services/auth-service';

const { publicRuntimeConfig } = getConfig();

const requestAuthInterceptor = (req: AxiosRequestConfig): AxiosRequestConfig => {
  const token = AuthService.getToken();
  if (token) {
    return {
      ...req,
      headers: {
        ...req.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return req;
};

const responseFulfilledInterceptor = (res: any): AxiosResponse => {
  if (res.data.error) {
    throw new Error(res.data.message);
  }
  return res;
};

const instance = axios.create({
  baseURL: publicRuntimeConfig.API_ENDPOINT,
});

instance.interceptors.request.use(requestAuthInterceptor);
instance.interceptors.response.use(responseFulfilledInterceptor);

export default instance;
