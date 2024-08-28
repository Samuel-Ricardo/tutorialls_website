export interface IHTTPGateway<C, R> {
  get(url: string, config?: C): Promise<R | undefined>;

  post<B>(url: string, body: B, config?: C): Promise<R | undefined>;

  put<B>(url: string, body: B, config?: C): Promise<R | undefined>;

  delete(url: string, config?: C): Promise<R | undefined>;

  patch<B>(url: string, body: B, config?: C): Promise<R | undefined>;
}
