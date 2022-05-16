import React, { useEffect, useState } from 'react';

import './App.scss';
import Header from '../header';
import ShortMessage from '../short-message';
import Loader from '../loader';
import GithubApi from '../../services/github-api';
import FullInfo from '../full-info';

const GithubApiObj=new GithubApi();

export const App = () => {

  const [appSearchQuery, setAppSearchQuery]=useState('');
  const [userInfoLoading,setUserInfoLoading]=useState('');
  const [userInfo,setUserInfo]=useState('');


  const getSearchQuery=(nickname)=>{
    setUserInfoLoading('');
    setAppSearchQuery(nickname);
  }


  const getUserInfo= async (appSearchQuery)=>{
    setUserInfoLoading(true);

    const data = await GithubApiObj.getUser(appSearchQuery);

    setUserInfoLoading(false);

    if(!data){
      setUserInfo(data);
      return data;
    }

    const {login,following,followers,name,html_url,avatar_url,public_repos}=data;
    setUserInfo({login,following,followers,name,html_url,avatar_url,public_repos});

    return data;
  }


  useEffect(()=>{
    if(appSearchQuery) getUserInfo(appSearchQuery);
  },[appSearchQuery])
  

  return (
    <div className="app-grid">
      <Header getSearchQuery={getSearchQuery} appSearchQuery={appSearchQuery}/>
      <main className="main">
        {userInfoLoading==='' && <ShortMessage contentInd={0}/>}
        {userInfoLoading && <Loader/>}
        {userInfoLoading===false && userInfo===false && <ShortMessage contentInd={1}/>}
        {userInfo && userInfoLoading===false && <FullInfo data={userInfo} numberRepos={userInfo.public_repos} appSearchQuery={appSearchQuery} />}
      </main>
    </div>
  );
};
