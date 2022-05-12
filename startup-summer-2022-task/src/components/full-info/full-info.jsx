import React from 'react';

import './full-info.scss';

import UserInfo from '../user-info';


export const FullInfo=({data,right})=>{
    return (
      <div className="full-info">
        <div className="container full-info__container">
          <UserInfo content={data} />
          {right}
        </div>
      </div>
    );
}
