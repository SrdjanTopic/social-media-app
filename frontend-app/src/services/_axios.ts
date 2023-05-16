import axios, { AxiosInstance } from "axios";

const createAxiosInstance = (url: string): AxiosInstance => {
  const token = localStorage.getItem("token");
  const instance = axios.create({
    url,
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return instance;
};

const get = async (url: string) => {
  const instance = createAxiosInstance(url);
  const result = await instance.get(url);
  if (result.status === 200 || result.status === 201) {
    return result.data;
  }
  throw new Error(
    `Call to ${url} failed with status ${result.status} and text ${result.statusText}`
  );
};

const post = async (url: string, body: Record<string, unknown>) => {
  const instance = createAxiosInstance(url);
  const result = await instance.post(url, body);
  if (result.status === 200 || result.status === 201) {
    return result.data;
  }
  throw new Error(
    `Call to ${url} failed with status ${result.status} and text ${result.statusText}`
  );
};

const deleteReq = async (url: string) => {
  const instance = createAxiosInstance(url);
  const result = await instance.delete(url);
  if (result.status === 200 || result.status === 201) {
    return result.data;
  }
  throw new Error(
    `Call to ${url} failed with status ${result.status} and text ${result.statusText}`
  );
};

const put = async (url: string, body: Record<string, unknown>) => {
  const instance = createAxiosInstance(url);
  const result = await instance.put(url, body);
  if (result.status === 200 || result.status === 201) {
    return result.data;
  }
  throw new Error(
    `Call to ${url} failed with status ${result.status} and text ${result.statusText}`
  );
};

const _axios = {
  get,
  post,
  put,
  deleteReq,
};

export default _axios;
