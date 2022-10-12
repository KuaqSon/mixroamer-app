import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export async function uploadFile(file: Blob) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axios.post(`${publicRuntimeConfig.API_ENDPOINT}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return { url: null };
  }
}
