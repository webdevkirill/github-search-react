import React from 'react';

export const Repos = ({repos}) => (
    <>
        <h3 className='mb-4'>Репозитории:</h3>
        {repos.map((repo) => (
            <div className='card mb-3' key={repo.id}>
                
                <div className="card-body">
                    <h5>
                        <a href={repo.html_url} target='_blank' rel="noopener noreferrer" >{repo.name}</a>
                    </h5>
                </div>
            </div>
        ))}
    </>
)