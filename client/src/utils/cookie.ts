import Cookie from 'js-cookie';
import { UserDto } from '../store/reducers/UserSlice';

export const getUserData = (): string => {
  const data = Cookie.get('serverUserData') ?? '';

  return data;
};
