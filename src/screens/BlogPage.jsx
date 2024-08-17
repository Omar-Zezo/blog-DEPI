import React, { useEffect, useState } from "react";
import { BlogImg } from "../assets/images";
import { useParams, Link } from "react-router-dom";
import { Like, Unlike, Views } from "../assets/svg";
import { deletePost, getSinglePost } from "../redux/actions/postsAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Notify from "../utils/Notify";


const BlogPage = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  const deletePostData = useSelector(state=> state.postsReducer.deletePost)
  const singlePostData = useSelector(state=> state.postsReducer.singlePost)
  const dispatch = useDispatch()

  const successMsg = () => toast.success("Post Deleted Successfly");

  //get Single post Data
  useEffect(()=>{
    if(id){
      dispatch(getSinglePost(id))
    }
  },[id])


  useEffect(()=>{
    if(singlePostData){
      setPost(singlePostData)
    }
  },[singlePostData])

  //Delete Post
  const handelDeletePost = ()=>{
    dispatch(deletePost(id))
  }

  useEffect(()=>{
    if(deletePostData){
      console.log(deletePostData)
      if(deletePostData.status === 200){
        successMsg()
      }
    }
  },[deletePostData])

  return (
    <div className="w-[90%] min-h-screen pb-5 mx-auto pt-[120px]">
      <div className="w-full h-[400px]">
        <img
          className="size-full object-cover rounded-md"
          src={BlogImg}
          alt="blog-image"
        />
        <div className="w-full pl-5 flex items-center gap-10 mt-2">
            <div className="flex items-center gap-4">
                <img width={20} src={Like} alt="like"/>
                <p className="text-base dark:text-white">{post.reactions?.likes}</p>
            </div>
            <div className="flex items-center gap-4">
                <img width={20} src={Unlike} alt="like"/>
                <p className="text-base dark:text-white">{post.reactions?.dislikes}</p>
            </div>
            <div className="flex items-center gap-2">
                <img width={25} src={Views} alt="view"/>
                <p className="text-[#666] dark:text-white font-medium">{post.reactions?.dislikes}</p>
                <p className="text-base dark:text-white">Views</p>
            </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-16">
        <h1 className="text-4xl font-semibold text-zinc-900 dark:text-white uppercase">{post.title}</h1>
        <p className="text-lg leading-9 text-zinc-900 dark:text-white">{post.body}</p>
      </div>
      <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 mt-10">
        <Link className="p-3 bg-green-600 font-medium text-white rounded-md cursor-pointer" to={`/update-post/${post.id}`}>Edit Post</Link>
      </div>
      <button className="flex items-center p-3 gap-2 font-medium mt-10 bg-red-600 text-white rounded-md cursor-pointer" onClick={handelDeletePost}>
        Delete
      </button>
      </div>
      <div className="flex items-center gap-2 mt-10">
        {
          post.tags?.map(tag=>(
            <p key={tag} className="text-sm text-white capitalize font-medium rounded-md dark:text-zinc-900 bg-zinc-900 dark:bg-slate-100 px-2 py-1">{tag}</p>
          ))
        }
      </div>
      <Notify/>
    </div>
  );
};

export default BlogPage;
