import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentDto } from './PostSlice';

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
export interface IGame {
  date: Date;
  hours: string;
  paymentType: PaymentType;
  equipmentId: string;
}

export interface GameDto {
  gameId: string;
  user: UserDto;
  date: Date;
  hours: string;
  paymentType: PaymentType;
  isPayed: boolean;
  createdAt: Date;
}

export interface GameDtoWithQr {
  gameId: string;
  user: UserDto;
  date: Date;
  hours: string;
  paymentType: PaymentType;
  isPayed: boolean;
  qrCode: string;
  createdAt: Date;
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
  postId: string;
  user: UserDto;
}

export interface IUser {
  userId: string;
  accessToken: string;
  games?: GameDto[] | null;
  cards?: CardDto[] | null;
  likes?: LikeDto[] | null;
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state: IUser, action: PayloadAction<IUser>) => {
      return action.payload;
    },
    setUserData: (state: IUser, action: PayloadAction<IUser>) => {
      if (action.payload?.email) state.email = action.payload.email;
      if (action.payload?.city) state.city = action.payload.city;
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
  setData,
  resetUserSlice,
  addCard,
  removeCard,
  removeGame,
  removeLike,
  addGame,
  addLike,
  setUserData,
} = userSlice.actions;

export default userSlice.reducer;
