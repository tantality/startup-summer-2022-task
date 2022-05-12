import React from 'react';

import './repositories-info.scss';


export const RepositoriesInfo=({data})=>{

    return (
      <section className="repositories-info">
        <div className="container repositories-info__container">
          <h1 className="repositories-info__title">Repositories ({data.length})</h1>
          <div className="repositories-info__content">
            {
              data.map(item=>{
                return <div className='repositories-info__repository repository' key={item.name}>
                  <h2 className='repository__title'><a className='repository__link link' href={item.html_url} target="_blank" rel="noreferrer">{item.name}</a></h2>
                  {item.description && <div className="repository__description text">{item.description}</div>}
                </div>
              })
            }
          </div>
        </div>
      </section>
    );
}
