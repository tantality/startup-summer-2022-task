import React from 'react';

import './short-message.scss';


export const ShortMessage = ({ contentInd }) => {
  const messageInfo = [
    { icon: 'icons/search.svg', text: 'Start with searching a GitHub user', alt: 'search icon' },
    { icon: 'icons/user.svg', text: 'User not found', alt: 'user icon' },
    { icon: 'icons/cross.svg', text: 'Repository list is empty', alt: 'cross icon' }
  ];


  const { icon, text, alt } = messageInfo[contentInd];


  return (
    <section className="short-message">
      <div className="container short-message__container">
        <img className="short-message__icon" src={process.env.PUBLIC_URL + icon} alt={alt} />
        <p className="short-message__text">{text}</p>
      </div>
    </section>
  );
}
