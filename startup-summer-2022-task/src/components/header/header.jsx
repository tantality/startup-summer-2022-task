import React,{useState} from 'react';

import './header.scss';


export const Header=(props)=>{

    const [searchQuery, setSearchQuery]=useState('');

    const onSearchBarValueChange=(e)=>{
      setSearchQuery(e.target.value);
    }

    const onKeyDown=(e)=>{
      let searchQueryTrimmed=searchQuery.trim();
      if(e.key=='Enter' && props.appSearchQuery!==searchQueryTrimmed && searchQuery.length) {
        setSearchQuery(searchQueryTrimmed);
        props.getSearchQuery(searchQueryTrimmed);
      }
    }

    return (
      <header className="header">
          <div className="container header__container">
              <a href="https://github.com/" target="_blank">
                <img className='logo' src={process.env.PUBLIC_URL + 'icons/github-logo.svg'} alt="logo"/>
              </a>
              <div className="container__search-bar search-bar ">
                  <input 
                    className='search-bar__field' 
                    id='search-bar'
                    type="search" 
                    placeholder="Enter GitHub username"
                    value={searchQuery}
                    onChange={onSearchBarValueChange}
                    onKeyDown={onKeyDown}
                    autoFocus={true}
                  />
                  <label htmlFor="search-bar" className='search-bar__icon'></label>
              </div>
          </div>
      </header>
    );
  
}
