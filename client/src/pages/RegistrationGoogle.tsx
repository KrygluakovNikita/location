import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { IGoogleRegistration, useLoginGoogleMutation } from '../store/api/UserApi';
import { setUser } from '../store/reducers/UserSlice';

export const RegistrationGoogle = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [LoginGoogle, { isError, error }] = useLoginGoogleMutation();

  const clickHandler = () => {
    const dto: IGoogleRegistration = { nickname: 'test8', city: 'minck' };
    LoginGoogle(dto);
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  return (
    <div>
      <div className='container'>
        <button onClick={clickHandler}>Запрос</button>
        <div className=''>{user && <p>{JSON.stringify(user)}</p>}</div>
      </div>
    </div>
  );
};
