import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { UserDto } from '../reducers/UserSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: build => ({
    getUsers: build.query<void, UserDto[]>({
      query: () => ({ url: `user/`, method: 'GET' }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
