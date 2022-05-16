import React,{useState,useEffect} from 'react';
import ReactPaginate from 'react-paginate';

import Loader from '../loader';
import GithubApi from '../../services/github-api';
import './repositories-info.scss';

const GithubApiObj=new GithubApi();

export const RepositoriesInfo=({numberRepos,appSearchQuery})=>{
  const itemsPerPage=4;

  const [itemOffset, setItemOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(itemsPerPage);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [reposInfoLoading,setReposInfoLoading]=useState('');
  const [reposInfo,setReposInfo]=useState('');


  useEffect(() => {
    getReposList(appSearchQuery,itemsPerPage,currentPage);
    
    const endOffset=itemOffset + itemsPerPage;

    if(endOffset>numberRepos) setEndOffset(numberRepos);
    else setEndOffset(endOffset);

    setPageCount(Math.ceil(numberRepos / itemsPerPage));
  }, [itemOffset]);


  const getReposList= async (appSearchQuery,itemsPerPage,currentPage)=>{
    setReposInfoLoading(true);

    let data = await GithubApiObj.getReposList(appSearchQuery,itemsPerPage,currentPage);

    setReposInfoLoading(false);

    if(!data.length){
      setReposInfo(false);
      return data;
    }

    data=data.map(({name,html_url,description})=> {
      return { 
        name, 
        html_url,
        description
      }
    })

    setReposInfo(data);
  }
  
  
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % numberRepos;
    
    setCurrentPage(event.selected+1);
    setItemOffset(newOffset);
  };


    return (
      <section className="repositories-info">
        <div className="container repositories-info__container">
          <h1 className="repositories-info__title">Repositories ({numberRepos})</h1>
              <div className="repositories-info__content">
              {(reposInfoLoading || reposInfoLoading==='') && <Loader/>}
              {reposInfoLoading===false && reposInfo &&
              
                  reposInfo.map(repo=>{
                    return <div className='repositories-info__repository repository' key={repo.name}>
                      <h2 className='repository__title'><a className='repository__link link' href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a></h2>
                      {repo.description && <div className="repository__description text">{repo.description}</div>}
                    </div>
                  })
                
              }
              </div>
          {appSearchQuery && pageCount>1 &&
            <div className="repositories-info__pagination pagination">
              <div className="pagination__items-info items-info">{itemOffset+1}-{endOffset} of {numberRepos}</div>
              <ReactPaginate 
                containerClassName={"pagination__control-panel control-panel"}
                pageLinkClassName={"control-panel__page"}
                activeLinkClassName={"control-panel__page_active"}
                previousClassName={"control-panel__previous previous arrow"}
                previousLinkClassName={"previous__link"}
                nextClassName={"control-panel__next next arrow"}
                nextLinkClassName={"next__link"}
                breakLabel="..."
                breakClassName={'control-panel__break break'}
                breakLinkClassName={"break__link"}
                nextLabel=""
                onPageChange={handlePageClick}
                pageCount={pageCount}
                previousLabel=""
                renderOnZeroPageCount={null}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
              >
              </ReactPaginate>
            </div>
        }
        </div>
      </section>
    );
}
