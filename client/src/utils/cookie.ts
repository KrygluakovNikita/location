import Cookie from 'js-cookie';

export const getUserData = (): string => {
  const data = Cookie.get('serverUserData') ?? '';
  if (data) Cookie.remove('serverUserData');
  return data;
};
