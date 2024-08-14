import baseURL from "../../api/baseURL";
import { GET_ALL_TAGS, GET_POSTS_TAG } from "../types";


export const getAllTags = ()=> async(dispatch)=>{
    try{
        const res = await baseURL.get('/posts/tags')
        dispatch({type: GET_ALL_TAGS, payload: res.data})
    }catch(e){
        dispatch({type: GET_ALL_TAGS, payload: e.response})
    }
}

export const getPostsTag = (tagName, str)=> async(dispatch)=>{
    try{
        const res = await baseURL.get(`/posts/tag/${tagName}?${str}`)
        dispatch({type: GET_POSTS_TAG, payload: res.data})
    }catch(e){
        dispatch({type: GET_POSTS_TAG, payload: e.response})
    }
}