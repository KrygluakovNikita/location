import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setRegistrationToken } from '../store/reducers/UserSlice';
import { getRegistrationToken } from '../utils/cookie';

export const RegistrationGoogle = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  console.log(user);
  useEffect(() => {
    const registrationToken = getRegistrationToken();
    if (registrationToken) {
      dispatch(setRegistrationToken(registrationToken));
    } else {
    }
  }, []);
  return <div>RegistrationGoogle</div>;
};
