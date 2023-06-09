const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export interface RequestResponse {
  ok: boolean;
  status: number;
  body: any;
}

export interface MyBlogAPIClient {
  get(url: string, query?: string, options?: any): Promise<RequestResponse>;
  post(url: string, body: any, options?: any): Promise<RequestResponse>;
  put(url: string, body: any, options?: any): Promise<RequestResponse>;
  delete(url: string, options?: any): Promise<RequestResponse>;
}

export default class MyBlogAPIClientImp {
  base_url;
  constructor() {
    this.base_url = BASE_API_URL + "/api";
  }

  async request(options: any): Promise<RequestResponse> {
    let response;
    let query = new URLSearchParams(options.query || {}).toString();

    if (query !== "") {
      query = "?" + query;
    }
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });

    } catch (error: any) {
      response = {
        ok: false,
        status: 500,
        json: async () => ({
          code: 500,
          message: "The server is unresponsive",
          desciption: error.toString(),
        }),
      };
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null,
    } as RequestResponse;
  }

  async get(
    url: string,
    query: string,
    options: any
  ): Promise<RequestResponse> {
    return this.request({
      method: "GET",
      url,
      query,
      ...options,
    }) as Promise<RequestResponse>;
  }
  async post(url: string, body: any, options: any): Promise<RequestResponse> {
    return this.request({ method: "POST", url, body, ...options });
  }
  async put(url: string, body: any, options: any): Promise<RequestResponse> {
    return this.request({ method: "PUT", url, body, ...options });
  }
  async delete(url: string, options: any): Promise<RequestResponse> {
    return this.request({ method: "DELETE", url, ...options });
  }
}
