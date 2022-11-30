import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { RootState } from '..';
import { resetUserSlice, setAccessToken } from '../reducers/UserSlice';

export const baseUrl = `${process.env.REACT_APP_SERVER_ENDPOINT}/api/`;
export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const user = (getState() as RootState).user;

    if (user && endpoint !== 'refresh') {
      headers.set('Authorization', `Bearer ${user.accessToken}`);
    }
    return headers;
  },
  credentials: 'include',
});

export const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery({ url: 'auth/refresh', method: 'GET' }, api, extraOptions);

    const response = refreshResult.data as any;
    if (response) {
      api.dispatch(setAccessToken(response.data.user.accessToken));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(resetUserSlice());
    }
  }

  return result;
};
