import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { IHTTPGateway } from '../http.gateway';
import { injectable } from 'inversify';

@injectable()
export class HttpNodeEngine implements IHTTPGateway<RequestInit, Response> {
  private _defaultConfig(url: string): RequestInit {
    return {
      next: { tags: [url] },
      mode: 'cors',
    };
  }

  async get(url: string, config?: RequestInit) {
    return await fetch(url, {
      ...this._defaultConfig(`get::${url}`),
      ...config,
    });
  }

  async post<B>(url: string, body: B, config?: RequestInit) {
    return await fetch(url, {
      ...this._defaultConfig(`post::${url}`),
      ...config,
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<B>(url: string, body: B, config?: RequestInit) {
    return await fetch(url, {
      ...this._defaultConfig(`put::${url}`),
      ...config,
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete(url: string, config?: RequestInit) {
    return await fetch(url, {
      ...this._defaultConfig(`delete::${url}`),
      ...config,
      method: 'DELETE',
    });
  }

  async patch<B>(url: string, body: B, config?: RequestInit) {
    return await fetch(url, {
      ...this._defaultConfig(`patch::${url}`),
      ...config,
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }
}
