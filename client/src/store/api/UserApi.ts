import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { UserDto } from '../reducers/UserSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  endpoints: build => ({
    getUsers: build.query<UserDto[], void>({
      query: () => ({ url: `user/`, method: 'GET' }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
