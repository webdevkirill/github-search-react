import React, { useContext, useEffect } from 'react';
import { GithubContext } from '../context/github/githubContext';
import { Link } from 'react-router-dom';
import classes from './Profile.module.sass'
import { Repos } from '../components/Repos';

export const Profile = ({match}) => {

    const {getUser, getRepos, loading, user, repos} = useContext(GithubContext);
    const urlName = match.params.name;

    useEffect(() => {
        getUser(urlName);
        getRepos(urlName);
        //eslint-disable-next-line
    }, [])

    if (loading) return (
        <p className='text-center'>Загрузка...</p>
    )

    const {name, company, avatar_url, location, bio, blog, login, html_url, followers, public_repos, publick_gists, following} = user;

    return (
        <>
            <Link to={'/'} className='btn btn-link' >На главную</Link>
            <div className={`card mb-4 p-3 ${classes.Profile}`}>
                <div className="card-CardBody">
                    <div className="row">
                        <div className='col-sm-5 text-center'>
                            <img src={avatar_url} alt={name} 
                            style={{width: 150}}/>
                            <h1>{name}</h1>
                            {location ? <p>Местоложение: {location}</p> : null}
                        </div>
                        <div className={`col-sm-7 ${classes.colFlex}`}>
                            {bio ? 
                            <>
                                <h3>Биография:</h3>
                                <p>{bio}</p>
                            </> : null}
                            <a href={html_url} className='btn btn-dark' target='_blank' rel="noopener noreferrer" style={{width: 200}}>Открыть профиль</a>
                            <ul>
                            {login ? <li><strong>UserName: </strong>{login}</li> : null}
                            {company ? <li><strong>Компания: </strong>{company}</li> : null}
                            {blog ? <li><strong>Website: </strong>{blog}</li> : null}
                            </ul>
                            <div>
                                <div className='badge badge-primary'>Подписчики: {followers || 0}</div>
                                <div className='badge badge-success'>Подписан: {following || 0}</div>
                                <div className='badge badge-info'>Репозитории: {public_repos || 0}</div>
                                <div className='badge badge-dark'>Gists: {publick_gists || 0}</div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>

            </div>
            <Repos repos={repos} />
        </>
    )
}