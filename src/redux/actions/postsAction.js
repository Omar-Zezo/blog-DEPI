import baseURL from "../../api/baseURL"
import { GET_ALL_POSTS, ADD_NEW_POST, EDIT_POST, DELETE_POST, SINGLE_POST } from "../types"

export const getAllPosts = (str)=> async(dispatch)=>{
    try{
        const res = await baseURL.get(`/posts?${str}`)
        dispatch({type: GET_ALL_POSTS, payload: res.data})
    }catch(error){
        dispatch({type: GET_ALL_POSTS, payload: error.response})
    }
}

export const getSinglePost = (id)=> async(dispatch)=>{
    try{
        const res = await baseURL.get(`/posts/${id}`)
        dispatch({type: SINGLE_POST, payload: res.data})
    }catch(error){
        dispatch({type: SINGLE_POST, payload: error.response})
    }
}

export const addNewPost = (data)=> async(dispatch)=>{
    try{
        const config = {headers: { 'Content-Type': 'application/json' }}
        const res = await baseURL.post(`/posts/add`, data, config)
        dispatch({type: ADD_NEW_POST, payload: res})
    }catch(error){
        dispatch({type: ADD_NEW_POST, payload: error.response})
    }
}

export const editPost = (id, data)=> async(dispatch)=>{
    try{
        const config = {headers: { 'Content-Type': 'application/json' }}
        const res = await baseURL.put(`/posts/${id}`, data, config)
        dispatch({type: EDIT_POST, payload: res})
    }catch(error){
        dispatch({type: EDIT_POST, payload: error.response})
    }
}

export const deletePost = (id, data)=> async(dispatch)=>{
    try{
        const config = {headers: { 'Content-Type': 'application/json' }}
        const res = await baseURL.delete(`/posts/${id}`, data, config)
        dispatch({type: DELETE_POST, payload: res})
    }catch(error){
        dispatch({type: DELETE_POST, payload: error.response})
    }
}
