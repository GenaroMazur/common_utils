import { Axios } from "axios";

export const axiosBuilder = (baseURL: string) => {
  return new Axios({
    baseURL,
    transformRequest: (r) => JSON.stringify(r),
    transformResponse: (r) => {
      try {
        return JSON.parse(r);
      } catch {
        return r;
      }
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
};
