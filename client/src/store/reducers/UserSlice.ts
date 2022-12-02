import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CardDto {
  cardId: string;
  card_number: number;
  mmyy: string;
  cvv: number;
}
export enum PaymentType {
  CASH = 'cash',
  CARD = 'card',
}
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface GameDto {
  gameId: string;
  user: UserDto;
  date: Date;
  hours: string;
  paymentType: PaymentType;
  isPayed: boolean;
}

export interface UserDto {
  email: string;
  userId: string;
  role: UserRole;
  isActivated: boolean;
  nickname: string;
  photo: string;
  isGoogle: boolean;
  city: string;
}

export interface LikeDto {
  likeId: string;
  user: UserDto;
}

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
  replyId: string;
  user: UserDto;
  userReply: UserDto;
  date: Date;
  message: string;
}

export interface CommentDto {
  commentId: string;
  user: UserDto;
  message: string;
  date: Date;
  answers: ReplyDto[];
}

export interface IUser {
  userId: string;
  accessToken: string;
  games?: GameDto[] | null;
  cards?: CardDto[] | null;
  likes?: LikeDto[] | null;
  posts?: PostDto[] | null;
  comments?: CommentDto[] | null;
  photo: string | null;
  role: UserRole;
  activationLink?: string | null;
  isActivated?: boolean;
  isGoogle?: boolean;
  email: string;
  nickname: string;
  city: string;
}

let initialState: IUser = {
  userId: '',
  games: [] as GameDto[],
  cards: [] as CardDto[],
  likes: [] as LikeDto[],
  posts: [] as PostDto[],
  comments: [] as CommentDto[],
  accessToken: '',
  photo: '',
  role: UserRole.USER,
  activationLink: '',
  isActivated: false,
  isGoogle: false,
  email: '',
  nickname: '',
  city: '',
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setUser: (state: IUser, action: PayloadAction<IUser>) => {
      return (state = { ...state, ...action.payload });
    },
    resetUserSlice: () => initialState,
    addGame: (state: IUser, action: PayloadAction<GameDto>) => {
      state.games?.push(action.payload);
    },
    removeGame: (state: IUser, { payload }: PayloadAction<GameDto>) => {
      state.games = state.games?.filter(game => game.gameId !== payload.gameId);
    },
    addCard: (state: IUser, action: PayloadAction<CardDto>) => {
      state.cards?.push(action.payload);
    },
    removeCard: (state: IUser, { payload }: PayloadAction<CardDto>) => {
      state.cards = state.cards?.filter(card => card.cardId !== payload.cardId);
    },
    addLike: (state: IUser, action: PayloadAction<LikeDto>) => {
      state.likes?.push(action.payload);
    },
    removeLike: (state: IUser, { payload }: PayloadAction<LikeDto>) => {
      state.likes = state.likes?.filter(like => like.likeId !== payload.likeId);
    },
    addPost: (state: IUser, action: PayloadAction<PostDto>) => {
      state.posts?.push(action.payload);
    },
    editPost: (state: IUser, { payload }: PayloadAction<PostDto>) => {
      const index = state.posts?.findIndex(post => {
        return post.postId === payload.postId;
      });
      if (index) {
        state.posts![index] = { ...payload };
      }
    },
    removePost: (state: IUser, { payload }: PayloadAction<PostDto>) => {
      state.posts = state.posts?.filter(post => post.postId !== payload.postId);
    },
    addComment: (state: IUser, action: PayloadAction<CommentDto>) => {
      state.comments?.push(action.payload);
    },
    editComment: (state: IUser, { payload }: PayloadAction<CommentDto>) => {
      const index = state.comments?.findIndex(comment => {
        return comment.commentId === payload.commentId;
      });
      if (index) {
        state.comments![index] = { ...payload };
      }
    },
    removeComment: (state: IUser, { payload }: PayloadAction<CommentDto>) => {
      state.comments = state.comments?.filter(comment => comment.commentId !== payload.commentId);
    },
    setPhoto: (state: IUser, { payload }: PayloadAction<string>) => {
      state.photo = payload;
    },
    setRole: (state: IUser, { payload }: PayloadAction<UserRole>) => {
      state.role = payload;
    },
    setActivationLink: (state: IUser, { payload }: PayloadAction<string>) => {
      state.activationLink = payload;
    },
    setAccessToken: (state: IUser, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
    },
    setIsActivated: (state: IUser, { payload }: PayloadAction<boolean>) => {
      state.isActivated = payload;
    },
    setEmail: (state: IUser, { payload }: PayloadAction<string>) => {
      state.email = payload;
    },
    setNickname: (state: IUser, { payload }: PayloadAction<string>) => {
      state.nickname = payload;
    },
    setCity: (state: IUser, { payload }: PayloadAction<string>) => {
      state.city = payload;
    },
  },
});

export const {
  setAccessToken,
  setActivationLink,
  setCity,
  setEmail,
  setIsActivated,
  setNickname,
  setPhoto,
  setRole,
  setUser,
  resetUserSlice,
  addCard,
  removeCard,
  removeComment,
  removeGame,
  removeLike,
  removePost,
  addComment,
  addGame,
  addLike,
  addPost,
  editComment,
  editPost,
} = resumeSlice.actions;

export default resumeSlice.reducer;
