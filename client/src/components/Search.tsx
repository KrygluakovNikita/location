import React, { FC, useEffect, useState } from 'react';
import { PostDto } from '../store/reducers/PostSlice';
import './Search.css';
import SearchIcon from '../images/Search.svg';
import moment from 'moment';

interface ISearchProps {
  posts: PostDto[];
  setFilteredPosts: React.Dispatch<React.SetStateAction<PostDto[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  playDate: string; setPlayDate: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: FC<ISearchProps> = ({ posts, setFilteredPosts, setSearch, search, playDate, setPlayDate }) => {
  useEffect(() => {
    if (playDate || search) {
      if (playDate && search) {
        const result =
          posts?.filter(
            post =>
              moment(post.gameDate).diff(playDate) >= 0 &&
              (post.description.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 ||
                post.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1)
          ) ?? [];
        setFilteredPosts(result);

      } else if (playDate) {

        const result =
          posts?.filter(
            post =>
              moment(post.gameDate).diff(playDate) >= 0
          ) ?? [];
        setFilteredPosts(result);
      } else {
        const result =
          posts?.filter(
            post =>
              post.description.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 ||
              post.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
          ) ?? [];
        setFilteredPosts(result);
      }
    } else {
      setFilteredPosts(posts);
    }
  }, [playDate, search, posts]);

  return (
    <div className='mid-top'>
      <div className='search'>
        <input placeholder='Поиск' onChange={e => setSearch(e.target.value)} />
        <img src={SearchIcon} alt='' />
      </div>
      <div className='search-by-date' onClick={() => {
        console.log('clicked');
      }}>
        <input
          type='datetime-local'
          onChange={e => {
            console.log(e.target.value);

            if (!e.target.value) {
              setPlayDate('');
            } else
              if (e.target.value) {
                setPlayDate(e.target.value);
              }
          }}
          className='profile-date-time-container-feed'
          value={playDate ?? ''}
        />
      </div>
    </div>
  );
};
