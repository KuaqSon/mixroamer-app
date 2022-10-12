import { useQuery } from '@tanstack/react-query';
import { IPaginatorRequest } from 'src/interfaces/common';
import { getListMusicsApi } from 'src/utils/api';

export interface IQueryMusicParams extends IPaginatorRequest {
  playing?: null | undefined | 'on';
  favorite?: null | undefined | 'on';
}

export function useQueryMusics(params: IQueryMusicParams) {
  const query = useQuery(['musics', params], () => getListMusicsApi(params), {
    refetchOnWindowFocus: false,
  });

  return { ...query, rows: query.data?.data?.rows || [], meta: query.data?.data?.meta };
}
