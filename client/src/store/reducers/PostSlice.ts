import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LikeDto, ReplyDto, UserDto } from './UserSlice';

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
      state.posts?.push(action.payload);
    },
    editPost: (state: IPosts, { payload }: PayloadAction<PostDto>) => {
      const index = state.posts?.findIndex(post => {
        return post.postId === payload.postId;
      });
      if (index) {
        state.posts![index] = { ...payload };
      }
    },
    removePost: (state: IPosts, { payload }: PayloadAction<string>) => {
      state.posts = state.posts?.filter(post => post.postId !== payload);
    },
    addComment: (state: IPosts, { payload }: PayloadAction<CommentDto>) => {
      const ind = state.posts.findIndex(post => post.postId === payload.postId);
      if (ind) {
        state.posts[ind].comments.push(payload);
      }
    },
    editComment: (state: IPosts, { payload }: PayloadAction<CommentDto>) => {
      const ind = state.posts.findIndex(post => post.postId === payload.postId);
      if (ind) {
        const commentInd = state.posts[ind].comments.findIndex(comment => comment.commentId === payload.commentId);
        if (commentInd) {
          state.posts[ind].comments[commentInd] = { ...payload };
        }
      }
    },
    removeComment: (state: IPosts, { payload }: PayloadAction<CommentDto>) => {
      const ind = state.posts.findIndex(post => post.postId === payload.postId);
      if (ind) {
        const commentInd = state.posts[ind].comments.findIndex(comment => comment.commentId === payload.commentId);
        if (commentInd) {
          state.posts[ind].comments[commentInd] = { ...payload };
        }
        state.posts[ind].comments = state.posts[ind].comments.filter(comment => comment.commentId !== payload.commentId);
      }
    },
  },
});

export const { addPost, editPost, removePost, setPosts, addComment } = postSlice.actions;

export default postSlice.reducer;
