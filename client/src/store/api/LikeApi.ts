import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { addLike } from '../reducers/PostSlice';
import { LikeDto } from '../reducers/UserSlice';

export const likeApi = createApi({
  reducerPath: 'likeApi',
  tagTypes: ['Likes'],
  baseQuery: customFetchBase,
  endpoints: build => ({
    addLike: build.mutation<LikeDto, string>({
      query: postId => ({ url: `like/${postId}`, method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        const like: LikeDto = data.data;

        if (like) {
          dispatch(addLike(like));
        }
      },
      invalidatesTags: [{ type: 'Likes', id: 'LIST' }],
    }),
  }),
});

export const { useAddLikeMutation } = likeApi;
