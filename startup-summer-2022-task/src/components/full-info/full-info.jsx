import React from 'react';

import RepositoriesInfo from '../repositories-info';
import ShortMessage from '../short-message';
import UserInfo from '../user-info';
import './full-info.scss';

export const FullInfo=({data,numberRepos,appSearchQuery})=>{

  return (
   <div className="full-info">
     <div className="container full-info__container">
       <UserInfo data={data} />
       {numberRepos>0 && <RepositoriesInfo appSearchQuery={appSearchQuery} numberRepos={numberRepos}/> }
       {numberRepos===0 && <ShortMessage contentInd={2}/> }
     </div>
   </div>
  );
}
