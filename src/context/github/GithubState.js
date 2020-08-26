import React, {useReducer} from 'react';
import { GithubContext } from "./githubContext";
import {GithubReducer} from './GithubReducer'
import { SEARCH_USERS, GET_USER, GET_REPOS, CLEAR_USERS, SET_LOADING } from '../types';
import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID,
    CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const withCreds = (url) => `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

export const GithubState = ({children}) => {
    const initialState = {
        user: {},
        users: [],
        loading: false,
        repos: []
    };
    const [state, dispatch] = useReducer( GithubReducer, initialState );

    const search = async (value) => {
        setLoading();

        const responce = await axios.get(withCreds(`https://api.github.com/search/users?q=${value}&`));

        dispatch({
            type: SEARCH_USERS,
            payload: responce.data.items
        })
    }

    const getUser = async (name) => {
        setLoading();

        const responce = await axios.get(withCreds(`https://api.github.com/users/${name}?`));

        dispatch({
            type: GET_USER,
            payload: responce.data
        })
    }

    const getRepos = async (name) => {
        setLoading();

        const responce = await axios.get(withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`));

        dispatch({
            type: GET_REPOS,
            payload: responce.data
        })
    }

    const clearUsers = async () => {
        //
        dispatch({
            type: CLEAR_USERS
        })
    }

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    const {user, users, repos, loading} = state;


    return (
        <GithubContext.Provider value={{
            user, users, repos, loading, search, getUser, getRepos, clearUsers, setLoading
        }}>
            {children}
        </GithubContext.Provider>
    )
}