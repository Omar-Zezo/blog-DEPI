import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostsTag } from "../redux/actions/tagsAction";
import Pagination from "../utils/Pagination";
import BlogCard from "../components/BlogCard";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { limit } from "../api/queries";
import SortPosts from "../utils/SortPosts";

const TagPage = () => {
  const [allposts, setAllPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [sorting, setSorting] = useState(['id', 'asc'])

  const navigate = useNavigate()

  const postsTagData = useSelector((state) => state.tagsReducer.postsTag);
  const dispatch = useDispatch();

  const { slug } = useParams();

  const [searchParams] = useSearchParams()

  const page = searchParams.get("page")
  const sortBy = searchParams.get("sortBy")
  const order = searchParams.get("order")
  const total = searchParams.get("total")

  
  useEffect(() => {
    if(slug !== null){
      dispatch(
        getPostsTag(slug,
          `sortBy=${sortBy ? sortBy : "id"}&order=${
            order ? order : "asc"
          }&limit=${limit}&skip=${page ? ((+page - 1) * limit) % +total : 0}`
        )
      );
    }
  }, [order, sortBy, slug]);


  useEffect(() => {
    if (postsTagData) {
      if (postsTagData.posts) {
        setAllPosts(postsTagData.posts);
        setTotalPosts(postsTagData.total);
      }
    }
  }, [postsTagData]);

  //handel pagination
  const getLimit = (newOffset, selected) => {
    dispatch(
      getPostsTag(slug,
        `sortBy=${sorting[0]}&order=${sorting[1]}&limit=${limit}&skip=${newOffset}`
      )
    );
    navigate(
      `?page=${selected + 1}&sortBy=${sortBy ? sortBy : "id"}&order=${
        order ? order : "asc"
      }&total=${totalPosts}`
    );
  };


  return (
    <div className="w-[90%] mx-auto min-h-screen pt-[120px] pb-5">
    <SortPosts sortBy={sortBy} order={order} totalPosts={totalPosts} page={page} setSorting={setSorting}/>
      <h1 className="lg:text-3xl text-xl font-bold capitalize mb-10 shadow-blue-400 shadow-sm border-2 border-blue-400 text-zinc-900 dark:text-white w-fit mx-auto p-3 dark:bg-zinc-900 bg-slate-200 rounded-md">Posts in {slug} Category</h1>
      <div className="flex justify-between flex-wrap gap-5">
        {allposts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination totalPosts={totalPosts} getLimit={getLimit} pageNumber={1} />
    </div>
  );
};

export default TagPage;
