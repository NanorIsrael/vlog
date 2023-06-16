
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

interface BodyType {
  code: number,
  message: string,
  description: string,
  access_token?: string
  errors: Error
}
export interface RequestResponse<T> {
  ok: boolean;
  status: number;
  body:  T | null
}

interface OptionsType<T>{
  method: string
  headers?: HeaderType
  query?: string
  body?: T 
  url: string
}
interface HTTPTOptions{
  headers?: HeaderType
}
interface HeaderType {
  Authorization: string
}

export interface MyBlogAPIClient {
  get: <R>(url: string, query?: string, options?: HTTPTOptions) => Promise<RequestResponse<R>>;
  post: <T, R>(url: string, body: T, options?: HTTPTOptions) => Promise<RequestResponse<R>>;
  put: <T, R>(url: string, body: T, options?: HTTPTOptions) => Promise<RequestResponse<R>>;
  delete: (url: string, options?: HTTPTOptions) => Promise<RequestResponse<null>>;
  login: (username: string, password: string) => Promise<string>
  logout: () => Promise<void>
  isAuthenticated: () => boolean
}

export default class MyBlogAPIClientImp{
  base_url;
  constructor() {
    if (!BASE_API_URL) {
      throw new Error("Base url is not provided");
    }
    this.base_url = BASE_API_URL + "/api";
  }

  async request<T, R>(options: OptionsType<T>): Promise<RequestResponse<R>> {
    let response;
    let query = new URLSearchParams((options.query || {}) as URLSearchParams).toString();

    if (query !== "") {
      query = "?" + query;
    }
    try {
      console.log("url", options.url)
      const accessToken =  localStorage.getItem("accessToken")
        if (!accessToken && options.url != "/tokens") {
          throw new Error("Access token not found");
        }
    

      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + String(accessToken),
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    } catch (error) {
      response = {
        ok: false,
        status: 500,
        // eslint-disable-next-line @typescript-eslint/require-await
        json: async () => ({
          code: 500,
          message: "The server is unresponsive",
          description: error ? String(error)  : "",
        })
      };
    }


    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? (await response.json()) as R : null,
    } ;
  }

  async get<T>(
    url: string,
    query?: string,
    options?: HTTPTOptions
  ): Promise<RequestResponse<T>> {
    return this.request({
      method: "GET",
      url,
      query,
      ...options
    }) ;
  }

  async post<T, R>(url: string, body: T, options?: HTTPTOptions): Promise<RequestResponse<R>> {
    return this.request({ method: "POST", url, body, ...options });
  }
  async put<T, R>(url: string, body: T, options?: HTTPTOptions): Promise<RequestResponse<R>> {
    return this.request({ method: "PUT", url, body, ...options });
  }
  async delete(url: string, options?: HTTPTOptions): Promise<RequestResponse<null>> {
    return this.request({ method: "DELETE", url, ...options });
  }

  async login(username: string, password: string) {
    const response = await this.post<null, LoginResponse>('/tokens', null, {
      headers: {
        'Authorization':  'Basic ' + (btoa(username + ":" + password))
      }
    })
    console.log("this is result", response)

    if (!response.ok) {
      return response.status === 401 ? 'fail' : 'error';
    }
    if (response.body?.access_token) {
      localStorage.setItem("accessToken",  response.body?.access_token);
    }
    return 'ok';
  }

  async logout() {
    await this.delete('/tokens')
    localStorage.removeItem("accessToken");
  }

  isAuthenticated() {
    return localStorage.getItem("accessToken") !== null
  }
}

interface LoginResponse {
   access_token: string
}