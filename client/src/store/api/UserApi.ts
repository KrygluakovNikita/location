import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { setUser, UserDto } from '../reducers/UserSlice';

export interface IUserLogin {
  password: string;
  email: string;
}
export interface IClientData {
  accessToken: string;
  user: UserDto;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  endpoints: build => ({
    getUsers: build.query<UserDto[], void>({
      query: () => ({ url: `user/`, method: 'GET' }),
    }),
    Login: build.mutation({
      query: body => ({
        url: `auth/login`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          const userDto = { ...data.data.userData, accessToken: data.data.accessToken };
          dispatch(setUser(userDto));

          return data.data;
        } catch (err) {}
      },
    }),
    // Google: build.query<UserDto, any>({
    //   query: () => ({
    //     url: 'http://localhost:8000/api/oauth/login/success',
    //     method: 'GET',
    //     credentials: 'include',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Credentials': 'true',
    //     },
    //   }),
    //   async onQueryStarted(id, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       dispatch(setUser(data));
    //     } catch (err) {}
    //   },
    // }),
  }),
});

export const { useGetUsersQuery, useLoginMutation } = userApi;
