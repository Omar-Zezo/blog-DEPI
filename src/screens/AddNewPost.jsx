import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../redux/actions/postsAction";
import { toast } from 'react-toastify';
import Notify from "../utils/Notify";


const AddNewPost = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addNewPostData = useSelector((state) => state.postsReducer.addPost);
  const dispatch = useDispatch();

  const successMsg = () => toast.success("Post Added Successfly");
  const errorMsg = (msg) => toast.error(msg);

  useEffect(()=>{
    if(addNewPostData){
      console.log(addNewPostData)
      if(addNewPostData.status === 201){
        successMsg()
      }
    }
  },[addNewPostData])

  //handel submit
  const handelSubmit = ()=>{
    if(title !== "" && value !== ""){
      dispatch(
        addNewPost(
          JSON.stringify({
            title,
            description,
            content: value,
            userId: 5,
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
            value={title}
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
          Publish
        </button>
        <Notify/>
      </div>
    </div>
  );
};

export default AddNewPost;
