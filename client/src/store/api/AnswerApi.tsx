import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { addAnswer, ReplyDto, ReplyUpload } from '../reducers/PostSlice';
import { UserDto } from '../reducers/UserSlice';

export interface IResponseAnswer {
  postId: string;
  replyId: string;
  user: UserDto;
  userReply: UserDto;
  date: Date;
  message: string;
  commentId: string;
}

export const answerApi = createApi({
  reducerPath: 'answerApi',
  tagTypes: ['Answers'],
  baseQuery: customFetchBase,
  endpoints: build => ({
    uploadAnswer: build.mutation<IResponseAnswer, ReplyUpload>({
      query: body => ({ url: `reply/${body.commentId}`, method: 'POST', body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        const reply: IResponseAnswer = data.data;

        dispatch(addAnswer(reply));
      },
      invalidatesTags: [{ type: 'Answers', id: 'LIST' }],
    }),
  }),
});

export const { useUploadAnswerMutation } = answerApi;
