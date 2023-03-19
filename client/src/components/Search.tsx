import React, { FC, useEffect, useState } from 'react';
import { PostDto } from '../store/reducers/PostSlice';
import './Search.css';
import SearchIcon from '../images/Search.svg';

interface ISearchProps {
  posts: PostDto[];
  setFilteredPosts: React.Dispatch<React.SetStateAction<PostDto[]>>;
}

export const Search: FC<ISearchProps> = ({ posts, setFilteredPosts }) => {
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search) {
        const result =
          posts?.filter(
            post =>
              post.description.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 ||
              post.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
          ) ?? [];
        setFilteredPosts(result);
      } else {
        setFilteredPosts(posts);
      }
    }, 180);
    return function () {
      clearTimeout(timeout);
    };
  }, [setSearch, search, posts]);

  return (
    <div className='mid-top'>
      <div className='search'>
        <input placeholder='Поиск' onChange={e => setSearch(e.target.value)} />
        <img src={SearchIcon} alt='' />
      </div>
    </div>
  );
};
