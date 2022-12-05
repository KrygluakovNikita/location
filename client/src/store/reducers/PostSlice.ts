import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentDto, LikeDto, UserDto } from './UserSlice';

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

export interface IPosts {
  posts: PostDto[];
}

let initialState: IPosts = {
  posts: [],
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setPosts: (state: IPosts, { payload }: PayloadAction<PostDto[]>) => {
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
  },
});

export const { addPost, editPost, removePost, setPosts } = resumeSlice.actions;

export default resumeSlice.reducer;
