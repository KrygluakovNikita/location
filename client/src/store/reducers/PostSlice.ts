import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseAnswer } from '../api/AnswerApi';
import { LikeDto, UserDto } from './UserSlice';

export interface PostDto {
  postId: string;
  user: UserDto;
  likes: LikeDto[];
  comments: CommentDto[];
  title: string;
  description: string;
  postDate: Date;
  gameDate: Date;
  location: string;
  photo: string;
}

export interface ReplyDto {
  commentId: string;
  replyId: string;
  user: UserDto;
  userReply: UserDto;
  date: Date;
  message: string;
}

export interface ReplyUpload {
  commentId: string;
  user: UserDto;
  userReply: UserDto;
  message: string;
}
export interface CommentDto {
  commentId: string;
  postId: string;
  user: UserDto;
  message: string;
  date: Date;
  answers: ReplyDto[];
}

export interface IPosts {
  posts: PostDto[];
}

let initialState: IPosts = {
  posts: [],
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state: IPosts, { payload }: PayloadAction<PostDto[]>) => {
      state.posts = [];
      state.posts = payload;
    },
    addPost: (state: IPosts, action: PayloadAction<PostDto>) => {
      state.posts.unshift(action.payload);
    },
    editPost: (state: IPosts, { payload }: PayloadAction<PostDto>) => {
      const index = state.posts?.findIndex(post => {
        return post.postId === payload.postId;
      });
      if (index !== -1) {
        state.posts![index] = { ...payload };
      }
    },
    addPhoto: (state: IPosts, { payload }: PayloadAction<PostDto>) => {
      const ind = state.posts.findIndex(post => post.postId === payload.postId);
      if (ind !== -1) {
        state.posts[ind].photo = payload.photo;
      }
    },
    addComment: (state: IPosts, { payload }: PayloadAction<CommentDto>) => {
      console.log('here');
      console.log(payload);
      console.log(state);

      const ind = state.posts.findIndex(post => post.postId === payload.postId);
      console.log(ind);
      console.log(state.posts);

      if (ind !== -1) {
        console.log('here2');

        state.posts[ind].comments.push(payload);
      }
    },
    addAnswer: (state: IPosts, { payload }: PayloadAction<IResponseAnswer>) => {
      const ind = state.posts.findIndex(post => post.postId === payload.postId);
      if (ind !== -1) {
        const commentInd = state.posts[ind].comments.findIndex(comment => comment.commentId === payload.commentId);
        if (commentInd !== -1) {
          const dto: ReplyDto = {
            replyId: payload.replyId,
            user: payload.user,
            userReply: payload.userReply,
            date: payload.date,
            message: payload.message,
            commentId: payload.commentId,
          };
          state.posts[ind].comments[commentInd].answers.unshift(dto);
        }
      }
    },
    removeComment: (state: IPosts, { payload }: PayloadAction<CommentDto>) => {
      const ind = state.posts.findIndex(post => post.postId === payload.postId);
      if (ind !== -1) {
        const commentInd = state.posts[ind].comments.findIndex(comment => comment.commentId === payload.commentId);
        if (commentInd) {
          state.posts[ind].comments[commentInd] = { ...payload };
        }
        state.posts[ind].comments = state.posts[ind].comments.filter(comment => comment.commentId !== payload.commentId);
      }
    },
  },
});

export const { addPost, editPost, addAnswer, setPosts, addComment, addPhoto } = postSlice.actions;

export default postSlice.reducer;
