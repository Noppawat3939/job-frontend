import serivce from "axios";

serivce.interceptors.request.use((config) => {
  config.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return config;
});

export default serivce;
