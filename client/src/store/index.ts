import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import postReducer from './reducers/PostSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { userApi } from './api/UserApi';
import { postApi } from './api/PostApi';
import { commentApi } from './api/CommentApi';
import { gameApi } from './api/GameApi';
import { equipmentApi } from './api/EquipmentApi';

const rootReducer = combineReducers({
  user: userReducer,
  postSlice: postReducer,
  [userApi.reducerPath]: userApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer,
  [equipmentApi.reducerPath]: equipmentApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [userApi.reducerPath, postApi.reducerPath, commentApi.reducerPath,gameApi.reducerPath, equipmentApi.reducerPath],
};

const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userApi.middleware, postApi.middleware, commentApi.middleware,  gameApi.middleware, equipmentApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootReducer = ReturnType<typeof rootReducer>;
