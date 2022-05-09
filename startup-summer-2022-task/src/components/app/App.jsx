import React, { useEffect, useState } from 'react';

import './App.scss';
import Header from '../header';
import ShortMessage from '../short-message';
import Loader from '../loader';

import GithubApi from '../../services/github-api';


const GithubApiObj=new GithubApi();

export const App = () => {

  const messageInfo=[
    {icon:'icons/search.svg', text:'Start with searching a GitHub user', alt:'search icon'},
    {icon:'icons/user.svg', text:'User not found', alt:'user icon'},
    {icon:'icons/cross.svg', text:'Repository list is empty', alt:'cross icon'}
  ];

  const [searchQuery, setSearchQuery]=useState('');

  const [userInfoLoading,setUserInfoLoading]=useState('');
  const [userInfo,setUserInfo]=useState('');
  const [reposInfoLoading,setreposInfoLoading]=useState('');
  const [reposInfo,setreposInfo]=useState('');

  const getSearchQuery=(nickname)=>{
    setUserInfoLoading('');
    setSearchQuery(nickname);
  }

  useEffect(()=>{
    if(searchQuery){
      setUserInfoLoading(true);
      GithubApiObj.getUser(searchQuery)
      .then(data=>{
        setUserInfo(data);
        setUserInfoLoading(false);
        return data;
      })
    }
  },[searchQuery])

  return (
    <div className="app-grid">
      <Header getSearchQuery={getSearchQuery} searchQuery={searchQuery}/>
      <main className='main'>
        {userInfoLoading==='' && reposInfoLoading===''  && <ShortMessage content={messageInfo[0]}/>}
        {userInfoLoading===true && <Loader/>}
      </main>
    </div>
  );
};
