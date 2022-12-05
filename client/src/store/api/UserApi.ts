import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { IUser, resetUserSlice, setUser, UserDto } from '../reducers/UserSlice';

export interface IUserLogin {
  password: string;
  email: string;
}
export interface IClientData {
  accessToken: string;
  user: UserDto;
}

export interface IGoogleRegistration {
  nickname: string;
  city: string;
}

export interface IRegistration {
  email: string;
  password: string;
  nickname: string;
  city: string;
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
          const userDto: IUser = { ...data.data.user, accessToken: data.data.accessToken };
          dispatch(setUser(userDto));

          return data.data.user;
        } catch (err) {
          return err;
        }
      },
    }),
    RegistrationGoogle: build.mutation({
      query: (body: IGoogleRegistration) => ({
        url: `auth/registration/google`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          const userDto: IUser = { ...data.data.user, accessToken: data.data.accessToken };

          dispatch(setUser(userDto));

          return data.data.user;
        } catch (err) {
          return err;
        }
      },
    }),
    Registration: build.mutation({
      query: (body: IRegistration) => ({
        url: `auth/registration`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          const userDto: IUser = { ...data.data.user, accessToken: data.data.accessToken };
          dispatch(setUser(userDto));

          return data.data.user;
        } catch (err) {
          return err;
        }
      },
    }),
    UpdatePhoto: build.mutation({
      query: (body: FormData) => ({
        url: `user/update-photo`,
        method: 'POST',
        body,
      }),
    }),
    Logout: build.mutation<any, void>({
      query: () => ({
        url: `auth/logout`,
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(resetUserSlice());
        await queryFulfilled.catch(err => console.log(err));
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginMutation,
  useRegistrationGoogleMutation,
  useUpdatePhotoMutation,
  useRegistrationMutation,
  useLogoutMutation,
} = userApi;
