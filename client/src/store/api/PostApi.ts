import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { addPhoto, addPost, deletePost, editPost, PostDto, setPosts } from '../reducers/PostSlice';
import { addLike, deleteLike } from '../reducers/PostSlice';
import { LikeDto } from '../reducers/UserSlice';
export interface IUploadPost {
  postId: string;
  title: string;
  description: string;
  gameDate: Date;
  location: string;
}
export interface IPostUploadImage {
  photo: FormData;
  postId: string;
}

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
      providesTags: result =>
        result
          ? [
              { type: 'Posts' as const, postId: result.postId },
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
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
    updatePost: build.mutation<PostDto, IUploadPost>({
      query: body => ({ url: `post/`, method: 'PATCH', body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        const post: PostDto = data.data;

        dispatch(editPost(post));
      },
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    UpdatePhoto: build.mutation({
      query: (body: IPostUploadImage) => ({
        url: `post/update-photo/${body.postId}`,
        method: 'POST',
        body: body.photo,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        dispatch(addPhoto(data.data));
        await queryFulfilled.catch(err => alert(err));
      },
    }),
    addLike: build.mutation<LikeDto, string>({
      query: postId => ({ url: `like/${postId}`, method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        const like: LikeDto = data.data;

        if (like) {
          dispatch(addLike(like));
        }
      },
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    deleteLike: build.mutation<LikeDto, string>({
      query: postId => ({ url: `like/${postId}`, method: 'DELETE' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        const like: LikeDto = data.data;
        if (like) {
          dispatch(deleteLike(like));
        }
      },

      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    deletePost: build.mutation<LikeDto, string>({
      query: postId => ({ url: `post/${postId}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useUploadPostMutation,
  useUpdatePhotoMutation,
  useUpdatePostMutation,
  useAddLikeMutation,
  useDeleteLikeMutation,
  useDeletePostMutation,
} = postApi;
