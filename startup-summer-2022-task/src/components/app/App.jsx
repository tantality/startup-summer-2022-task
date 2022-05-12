import React, { useEffect, useState } from 'react';

import './App.scss';
import Header from '../header';
import ShortMessage from '../short-message';
import Loader from '../loader';
import GithubApi from '../../services/github-api';
import FullInfo from '../full-info';
import RepositoriesInfo from '../repositories-info';


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
  const [reposInfoLoading,setReposInfoLoading]=useState('');
  const [reposInfo,setReposInfo]=useState('');

  const getSearchQuery=(nickname)=>{
    setUserInfoLoading('');
    setAppSearchQuery(nickname);
  }

  const getUserInfo= async ()=>{
    setUserInfoLoading(true);
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

  const getReposList= async ()=>{
    setReposInfoLoading(true);
    let data = await GithubApiObj.getReposList(appSearchQuery);
    setReposInfoLoading(false);
    if(!data.length){
      setReposInfo(false);
      return data;
    }
    setReposInfo(data);
  }

  useEffect(()=>{
    setReposInfo('');
    if(appSearchQuery){
      getUserInfo()
      .then(data=> {
        if(data) getReposList();
      })
    }
  },[appSearchQuery])

  return (
    <div className="app-grid">
      <Header getSearchQuery={getSearchQuery} appSearchQuery={appSearchQuery}/>
      <main className='main'>
        {userInfoLoading==='' && reposInfoLoading===''  && <ShortMessage content={messageInfo[0]}/>}
        {userInfoLoading && <Loader/>}
        {userInfoLoading===false && userInfo===false && <ShortMessage content={messageInfo[1]}/>}
        {reposInfoLoading  && <FullInfo data={userInfo} right={<Loader/>}/>}
        {reposInfo===false && reposInfoLoading===false && <FullInfo data={userInfo} right={<ShortMessage content={messageInfo[2]}/>} />}
        {reposInfoLoading===false  && reposInfo && <FullInfo data={userInfo} right={<RepositoriesInfo data={reposInfo}/>}/>}
      </main>
    </div>
  );
};
