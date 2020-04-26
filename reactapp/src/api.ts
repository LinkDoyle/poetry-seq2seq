import axios from "axios";

export type Info = {
  keywords: string[];
  isCangTou: boolean;
  imgBase64: string | null;
};

export async function generate(info: Info) {
  const response = await axios.post(`/api/generate`, info);
  console.log(response)
  return response.data;
}
