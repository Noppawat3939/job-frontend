import { getTokenWithHeaders } from "@/lib";
import serivce from "axios";

serivce.interceptors.request.use((config) => {
  config.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

  return config;
});

export default serivce;
