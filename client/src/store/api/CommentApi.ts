import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { addAnswer, addComment, CommentDto, ReplyUpload } from '../reducers/PostSlice';
import { IUser, UserDto } from '../reducers/UserSlice';

export interface ICommentUpload {
  postId: string;
  user: IUser;
  message: string;
}
export interface IResponseAnswer {
  replyId: string;
  user: UserDto;
  userReply: UserDto;
  date: Date;
  message: string;
  comment: CommentDto;
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
    uploadAnswer: build.mutation<IResponseAnswer, ReplyUpload>({
      query: body => ({ url: `reply/${body.commentId}`, method: 'POST', body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        const reply: IResponseAnswer = data.data;

        dispatch(addAnswer(reply));
      },
      invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
    }),
  }),
});

export const { useAddCommentMutation,useUploadAnswerMutation } = commentApi;
