import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export function caseInsensitiveStringCompare(str1: string, str2: string) {
  return str1.localeCompare(str2, undefined, {
    sensitivity: 'base',
    numeric: true,
  });
}

export function caseInsensitiveStringEqual(str1: string, str2: string) {
  return caseInsensitiveStringCompare(str1, str2) === 0;
}

export function sleep(ms: number): Promise<void> {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function buildMediaUrl(url: string): string {
  if (!url) {
    return '';
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `${publicRuntimeConfig.API_ENDPOINT}${url}`;
}
