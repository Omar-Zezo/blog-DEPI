import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../redux/actions/postsAction";
import Pagination from "../utils/Pagination";
import BlogCard from "../components/BlogCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import SortPosts from "../utils/SortPosts";
import { limit } from "../api/queries";

const Home = () => {
  const [allposts, setAllPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [sorting, setSorting] = useState(["id", "asc"]);

  const navigate = useNavigate();

  const postsData = useSelector((state) => state.postsReducer.posts);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");
  const total = searchParams.get("total");


  useEffect(() => {
    dispatch(
      getAllPosts(
        `sortBy=${sortBy ? sortBy : "id"}&order=${
          order ? order : "asc"
        }&limit=${limit}&skip=${page ? ((+page - 1) * limit) % +total : 0}`
      )
    );
  }, [order, sortBy]);


  useEffect(() => {
    if (postsData) {
      if (postsData.posts) {
        setAllPosts(postsData.posts);
        setTotalPosts(postsData.total);
      }
    }
  }, [postsData]);

  //handel pagination
  const getLimit = async (newOffset, selected) => {
    dispatch(
      getAllPosts(
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
      <h1 className="lg:text-3xl text-xl font-bold capitalize mb-10 shadow-blue-400 shadow-sm border-2 border-blue-400 text-zinc-900 dark:text-white w-fit mx-auto p-3 dark:bg-zinc-900 bg-slate-200 rounded-md">
        You can search and sort posts
      </h1>
      <div className="flex justify-between flex-wrap gap-5">
        {allposts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        totalPosts={totalPosts}
        getLimit={getLimit}
        pageNumber={+page}
      />
    </div>
  );
};

export default Home;
