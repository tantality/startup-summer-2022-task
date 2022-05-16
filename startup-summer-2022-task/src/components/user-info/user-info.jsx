import React from 'react';

import './user-info.scss';


export const UserInfo = (props) => {

  const { login, following, followers, name, html_url, avatar_url } = props.data;


  const getNumberOfPeople = (number) => {
    const originalStr = number.toString();

    return originalStr.length < 4 ? originalStr : transformStr(originalStr);
  }


  const transformStr = (originalStr) => {
    const abbreviations = ['K', 'M', 'B'];
    const abbreviationsLength = abbreviations.length;
    const originalStrLength = originalStr.length;
    const baseDivider = 10;
    let transformedStr = originalStr;

    for (let strLength = 3, ind = 0; ind < abbreviationsLength; strLength += 3, ind++) {

      if (originalStrLength > strLength && originalStrLength <= strLength + 3) {
        transformedStr = +(+originalStr / Math.pow(baseDivider, strLength)).toFixed(1);
        transformedStr += abbreviations[ind];

        return transformedStr;
      }

    }
  }


  return (
    <section className="user-info">
      <img className="user-info__img" src={avatar_url} alt={name} />
      <h2 className="user-info__name">{name}</h2>
      <div className="user-info__username username">
        <a className="username__link link" href={html_url} target="_blank" rel="noreferrer">{login}</a>
      </div>
      <div className="user-info__additional additional">
        <div className="additional__followers followers">
          <img className="followers__icon" src={process.env.PUBLIC_URL + "icons/followers.svg"} alt="followers-icon" />
          <div className="text followers__text">{getNumberOfPeople(followers)} followers</div>
        </div>
        <div className="additional__following">
          <img className="following__icon" src={process.env.PUBLIC_URL + "icons/member.svg"} alt="member-icon" />
          <div className="text following__text">{getNumberOfPeople(following)} following</div>
        </div>
      </div>
    </section>
  );
}
