import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { addPost, PostDto, setPosts } from '../reducers/PostSlice';

export interface IUploadPost {
  title: string;
  description: string;
  gameDate: Date;
  location: string;
}

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts'],
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
    uploadPost: build.mutation<PostDto, IUploadPost>({
      query: body => ({ url: `post/`, method: 'POST', body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        const post: PostDto = data.data;

        dispatch(addPost(post));
      },
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useUploadPostMutation } = postApi;
