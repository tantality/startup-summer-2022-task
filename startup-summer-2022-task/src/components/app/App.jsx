import React, { useEffect, useState } from 'react';

import './App.scss';
import Header from '../header';
import ShortMessage from '../short-message';
import Loader from '../loader';

import GithubApi from '../../services/github-api';
import UserInfo from '../user-info';


const GithubApiObj=new GithubApi();

export const App = () => {

  const messageInfo=[
    {icon:'icons/search.svg', text:'Start with searching a GitHub user', alt:'search icon'},
    {icon:'icons/user.svg', text:'User not found', alt:'user icon'},
    {icon:'icons/cross.svg', text:'Repository list is empty', alt:'cross icon'}
  ];

  const [appSearchQuery, setAppSearchQuery]=useState('');

  const [userInfoLoading,setUserInfoLoading]=useState('');
  const [userInfo,setUserInfo]=useState('');
  const [reposInfoLoading,setreposInfoLoading]=useState('');
  const [reposInfo,setreposInfo]=useState('');

  const getSearchQuery=(nickname)=>{
    setUserInfoLoading('');
    setAppSearchQuery(nickname);
  }

  const getUserInfo= async ()=>{
    let data = await GithubApiObj.getUser(appSearchQuery);
    setUserInfoLoading(false);
    if(!data){
      setUserInfo(data);
      return data;
    }
    const {login,following,followers,name,html_url,avatar_url}=data;
    setUserInfo({login,following,followers,name,html_url,avatar_url});
    return data;
  }

  useEffect(()=>{
    if(appSearchQuery){
      setUserInfoLoading(true);
      getUserInfo()
    }
  },[appSearchQuery])

 
  return (
    <div className="app-grid">
      <Header getSearchQuery={getSearchQuery} appSearchQuery={appSearchQuery}/>
      <main className='main'>
        {userInfoLoading==='' && reposInfoLoading===''  && <ShortMessage content={messageInfo[0]}/>}
        {userInfoLoading===true && <Loader/>}
        {userInfoLoading===false && userInfo===false && <ShortMessage content={messageInfo[1]}/>}
        {!userInfoLoading && userInfo && <UserInfo content={userInfo} />}
      </main>
    </div>
  );
};
