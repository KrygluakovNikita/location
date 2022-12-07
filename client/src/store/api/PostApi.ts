import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { PostDto, setPosts } from '../reducers/PostSlice';

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts', 'Comments'],
  baseQuery: customFetchBase,
  endpoints: build => ({
    getPosts: build.query<PostDto[], void>({
      query: () => ({ url: `post/`, method: 'GET' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        const posts: PostDto[] = data.data;
        dispatch(setPosts(posts));
      },
      providesTags: result =>
        result
          ? [...result.map(({ postId }) => ({ type: 'Posts' as const, postId })), { type: 'Posts', id: 'LIST' }]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPost: build.query<PostDto, string>({
      query: postId => ({ url: `post/${postId}`, method: 'GET' }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery } = postApi;
