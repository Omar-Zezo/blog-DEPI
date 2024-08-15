import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Axios from 'axios'
import BlogCard from "../components/BlogCard";

const SearchPage = () => {
  const [posts, setPosts] = useState([])
  const [searchParams] = useSearchParams()

  const searchValue = searchParams.get("value")

    const getSearch = async(searchValue)=>{
    const data = await Axios.get(`https://dummyjson.com/posts/search?q=${searchValue}`)
    setPosts(data.data.posts)
  }

  useEffect(()=>{
    getSearch(searchValue)
  },[searchValue])

  return (
    <div className="w-[90%] min-h-screen flex justify-between flex-wrap gap-5 pb-5 mx-auto pt-[120px]">
      {posts.map((post) => (
        <BlogCard key={post.title} post={post} />
      ))}
    </div>
  );
};

export default SearchPage;
