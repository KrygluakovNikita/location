import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { addGame, GameDto, IGame } from '../reducers/UserSlice';

export interface IUpdatePayByGameId {
  gameId: string;
  isPayed: boolean;
}
export interface IGetStatGame {
  startDate: Date;
  endDate: Date;
}
export interface IGetStatGameResponse {
  games: GameDto[];
  count: number;
}

export const gameApi = createApi({
  reducerPath: 'gameApi',
  tagTypes: ['Games'],
  baseQuery: customFetchBase,
  endpoints: build => ({
    addGame: build.mutation<GameDto, IGame>({
      query: body => ({ url: `/game`, method: 'POST', body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const data = await queryFulfilled;
        const game: GameDto = data.data;
        dispatch(addGame(game));
      },
      invalidatesTags: result =>
        result
          ? [
              { type: 'Games' as const, gameId: result.gameId },
              { type: 'Games', id: 'LIST' },
            ]
          : [{ type: 'Games', id: 'LIST' }],
    }),
    updatePayByGameId: build.mutation<GameDto, IUpdatePayByGameId>({
      query: body => ({ url: `/game/pay/${body.gameId}`, method: 'PUT', body }),
      invalidatesTags: result =>
        result
          ? [
              { type: 'Games' as const, gameId: result.gameId },
              { type: 'Games', id: 'LIST' },
            ]
          : [{ type: 'Games', id: 'LIST' }],
    }),
    getGame: build.query<GameDto, string>({
      query: (gameId: string) => ({ url: `game/${gameId}`, method: 'GET' }),
    }),
    getGames: build.query<GameDto[], void>({
      query: () => ({ url: `game/`, method: 'GET' }),
    }),
    getUserGames: build.query<GameDto[], void>({
      query: () => ({ url: `game/user`, method: 'GET' }),
    }),
    getGamesStat: build.mutation<IGetStatGameResponse, IGetStatGame>({
      query: body => ({ url: `game/stat`, method: 'POST', body }),
    }),
  }),
});

export const { useGetGamesStatMutation, useAddGameMutation, useGetGameQuery, useUpdatePayByGameIdMutation, useGetGamesQuery, useGetUserGamesQuery } =
  gameApi;
