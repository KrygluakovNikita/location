import { createApi } from '@reduxjs/toolkit/query/react';
import { customFetchBase } from '.';
import { addGame, GameDto, IGame } from '../reducers/UserSlice';

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
        console.log(game);

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
    getGame: build.query<GameDto, string>({
      query: (gameId: string) => ({ url: `game/${gameId}`, method: 'GET' }),
    }),
  }),
});

export const { useAddGameMutation, useGetGameQuery } = gameApi;
