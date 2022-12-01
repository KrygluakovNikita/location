import Cookie from 'js-cookie';

export const getUserData = (): string => {
  const data = Cookie.get('serverUserData') ?? '';

  return data;
};
