import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { addComment, CommentDto } from '../reducers/PostSlice';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  tagTypes: ['Comments'],
  baseQuery: customFetchBase,
  endpoints: build => ({
    addComment: build.mutation<CommentDto, void>({
      query: () => ({ url: `comment/`, method: 'POST' }),
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
