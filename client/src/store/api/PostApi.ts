import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { PostDto, setPosts } from '../reducers/PostSlice';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: customFetchBase,
  endpoints: build => ({
    getPosts: build.query<PostDto[], void>({
      query: () => ({ url: `post/`, method: 'GET' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        const posts: PostDto[] = { ...data.data };
        dispatch(setPosts(posts));
      },
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
