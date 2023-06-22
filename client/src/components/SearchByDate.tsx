import React, { FC, useEffect, useState } from 'react';
import { PostDto } from '../store/reducers/PostSlice';
import './SearchByDate.css';
import moment from 'moment';

interface ISearchProps {
  posts: PostDto[];
  setFilteredPosts: React.Dispatch<React.SetStateAction<PostDto[]>>;
  setPlayDate: React.Dispatch<React.SetStateAction<string>>;
  playDate:string;
  search:string;
}

export const SearchByDate: FC<ISearchProps> = ({ posts, setFilteredPosts,setPlayDate,playDate,search }) => {
  useEffect(() => {
   
      if (playDate || search) {
       if(playDate&&search){
         const result =
           posts?.filter(
             post =>
               moment(post.gameDate).diff(playDate)>=0  &&
               (post.description.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 ||
              post.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1)
           ) ?? [];
         setFilteredPosts(result);

       }else if(playDate){

         const result =
         posts?.filter(
           post =>
           moment(post.gameDate).diff(playDate)>=0 
           ) ?? [];
           setFilteredPosts(result);
          }else{
                    const result =
          posts?.filter(
            post =>
              post.description.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1 ||
              post.title.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
          ) ?? [];
        setFilteredPosts(result);
          }
      }  else {
        setFilteredPosts(posts);
      }
  }, [playDate, posts,search]);

  return (
    <div className='mid-top'>
      <div className='search-by-date' onClick={()=>{console.log('clicked');
      }}>
                          <input
                    type='datetime-local'
                    onChange={e => {

                    }}
                    className='profile-date-time-container-feed'
                    value={playDate ?? ''}
                  />
      </div>
    </div>
  );
};
