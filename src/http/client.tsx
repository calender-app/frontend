import axios from "axios";

export class HttpClient {
  get(url: string) {
    console.log({ url });
    return axios.get(url);
  }
  post(url: string, data: any) {
    return axios.post(url, data);
  }
  put(url: string, data: any) {
    return axios.put(url, data);
  }

  delete(url: string) {
    return axios.delete(url);
  }
}
