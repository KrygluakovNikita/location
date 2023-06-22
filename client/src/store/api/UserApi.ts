import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { IUser, resetUserSlice, setData, setUserData, UserDto } from '../reducers/UserSlice';

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
export interface IUpdateUserData {
  newPassword?: string;
  newEmail?: string;
  newCity?: string;
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
          dispatch(setData(userDto));

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

          dispatch(setData(userDto));

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
          dispatch(setData(userDto));

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
    updateUserData: build.mutation<UserDto, IUpdateUserData>({
      query: (body: IUpdateUserData) => ({
        url: `user/change-user-data/`,
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;

        const userDto: UserDto = { ...data.data };

        dispatch(setUserData(userDto as any)); ///fix here
      },
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
  useUpdateUserDataMutation,
} = userApi;
