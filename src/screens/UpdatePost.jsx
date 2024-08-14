import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { editPost, getSinglePost } from "../redux/actions/postsAction";
import { toast } from 'react-toastify';
import Notify from "../utils/Notify";
import { useParams } from "react-router-dom";


const UpdatePost = () => {
  const [value, setValue] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");

  const editPostData = useSelector((state) => state.postsReducer.editPost);
  const singlePostData = useSelector(state=> state.postsReducer.singlePost)
  const dispatch = useDispatch();

  const {id} = useParams()

  const successMsg = () => toast.success("Post Added Successfly");
  const errorMsg = (msg) => toast.error(msg);

  useEffect(()=>{
    if(editPostData){
      console.log(editPostData)
      if(editPostData.status === 201){
        successMsg()
      }
    }
  },[editPostData])

  //get Single Post Data
  useEffect(()=>{
    dispatch(getSinglePost(id))
  },[id])

  useEffect(()=>{
    if(singlePostData){
      setPostTitle(singlePostData.title)
    }
  },[singlePostData])

  //handel submit
  const handelSubmit = ()=>{
    if(title !== "" && value !== ""){
      dispatch(
        editPost(
            id,
          JSON.stringify({
            title,
          })
        )
      )
    }else{
      errorMsg("The title and content mustn't be empty")
    }
  }

  return (
    <div className="w-[90%] mx-auto min-h-screen pt-[120px] pb-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            className="flex items-center text-xl dark:text-white font-medium"
            htmlFor="title"
          >
            Title <span className="text-red-700 ml-1">*</span>
          </label>
          <input
            className="p-3 bg-transparent border dark:text-white outline-none border-gray-300"
            type="text"
            value={postTitle}
            id="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="flex items-center text-xl dark:text-white font-medium"
            htmlFor="title"
          >
            Description
          </label>
          <input
            className="p-3 bg-transparent border dark:text-white outline-none border-gray-300"
            type="text"
            value={description}
            id="title"
            placeholder="(Optional)"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-5">
        <ReactQuill
          className="h-[500px] dark:text-white"
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
      <div className="mt-20">
        <button
          className="w-[100px] h-[40px] flex justify-center items-center rounded-md text-white text-base font-medium cursor-pointer bg-blue-500 hover:bg-blue-600"
          onClick={handelSubmit}
        >
          Edit Post
        </button>
        <Notify/>
      </div>
    </div>
  );
};

export default UpdatePost;
