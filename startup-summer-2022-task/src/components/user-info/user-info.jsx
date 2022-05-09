import React from 'react';

import './user-info.scss';


export const UserInfo=(props)=>{

  const {login,following,followers,name,html_url,avatar_url}=props.content;

  const getQuantity=(number)=>{
    let str=number.toString();
    if(str.length>3) {
      str=(number/1000).toFixed(1);
      if(str[str.length-1]==0) str=Math.round(str);
      str+='K';
    }
    return str;
  }

    return (
      <section className="user-info">
            <img className='user-info__img' src={avatar_url} alt={name} />
            <div className="user-info__name">{name}</div>
            <div className="user-info__username username">
              <a className='username__link' href={html_url} target="_blank">{login}</a>
            </div>
            <div className="user-info__additional additional">
              <div className="additional__followers followers">
                <img className='followers__icon' src={process.env.PUBLIC_URL + 'icons/followers.svg'} alt="followers-icon" />
                <div className="followers__value">{getQuantity(followers)} followers</div>
              </div>
              <div className="additional__following">
                <img className='following__icon' src={process.env.PUBLIC_URL + 'icons/member.svg'} alt="member-icon" />
                <div className="following__value">{getQuantity(following)} following</div>
              </div>
            </div>
      </section>
    );
}
