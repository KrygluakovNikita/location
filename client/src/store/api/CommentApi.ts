import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { addComment, CommentDto } from '../reducers/PostSlice';
import { IUser } from '../reducers/UserSlice';

export interface ICommentUpload {
  postId: string;
  user: IUser;
  message: string;
}

export const commentApi = createApi({
  reducerPath: 'commentApi',
  tagTypes: ['Comments'],
  baseQuery: customFetchBase,
  endpoints: build => ({
    addComment: build.mutation<CommentDto, ICommentUpload>({
      query: body => ({ url: `comment/${body.postId}`, method: 'POST', body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        const comment: CommentDto = data.data;
        dispatch(addComment(comment));
      },
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
    }),
  }),
});

export const { useAddCommentMutation } = commentApi;
