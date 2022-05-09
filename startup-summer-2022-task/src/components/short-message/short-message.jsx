import React from 'react';

import './short-message.scss';


export const ShortMessage=(props)=>{

  const {icon, text, alt}=props.content;

    return (
      <section className="short-message">
          <div className="container short-message__container">
            <img className='short-message__icon' src={process.env.PUBLIC_URL + icon} alt={alt} />
            <p className='short-message__text'>{text}</p>
          </div>
      </section>
    );
}
