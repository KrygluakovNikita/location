import { FC } from 'react';
import './Terms.css';
interface ITremsProps {
  setAgree: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Terms: FC<ITremsProps> = ({ setAgree }) => {
  return (
    <div className='terms'>
      <table>
        <tbody>
          <tr>
            <td>
              <input type='checkbox' id='checkbox_id' className='adminProfileCheckbox' onClick={() => setAgree(state => !state)} />
            </td>
            <td>
              <label>
                Я согласен с условиями{' '}
                <a href='/#' className='accent'>
                  Пользовательского соглашения
                </a>
              </label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
