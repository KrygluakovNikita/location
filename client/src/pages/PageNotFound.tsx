import { Link } from 'react-router-dom';
import './PageNotFound.css';

export const PageNotFound = () => {
  return (
    <div className='card'>
      <h2 className='title'>404 Page not found</h2>
      <span className='go-back'>
        <Link to='/'>Вернуться на главную страницу</Link>
      </span>
    </div>
  );
};
