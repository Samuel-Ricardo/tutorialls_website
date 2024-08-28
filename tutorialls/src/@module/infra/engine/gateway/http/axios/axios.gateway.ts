import { IHTTPGateway } from '../http.gateway';
import axios, { AxiosResponse } from 'axios';
import { AxiosRequestConfig } from 'axios';
import { injectable } from 'inversify';

@injectable()
export class AxiosHttpGateway
  implements IHTTPGateway<AxiosRequestConfig, AxiosResponse>
{
  async get(url: string, config?: AxiosRequestConfig) {
    return await axios.get(url, config);
  }

  async post<B>(url: string, body: B, config?: AxiosRequestConfig) {
    return await axios.post(url, body, config);
  }

  async put<B>(url: string, body: B, config?: AxiosRequestConfig) {
    return await axios.put(url, body, config);
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    return await axios.delete(url, config);
  }

  async patch<B>(url: string, body: B, config?: AxiosRequestConfig) {
    return await axios.patch(url, body, config);
  }
}
