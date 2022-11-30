import Cookie from 'js-cookie';

export const getUserData = (): string => {
  const data = Cookie.get('serverUserData') ?? '';

  return data;
};

export const getRegistrationToken = (): string => {
  const data = Cookie.get('registrationToken') ?? '';

  return data;
};
