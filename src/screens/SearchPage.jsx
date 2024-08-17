import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getPostsSearch } from "../redux/actions/postsAction";
import SortPosts from "../utils/SortPosts";
import { limit } from "../api/queries";
import Pagination from "../utils/Pagination";

const SearchPage = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [sorting, setSorting] = useState(["id", "asc"]);

  const searchPostsData = useSelector(
    (state) => state.postsReducer.searchPosts
  );
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = searchParams.get("page");
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");
  const total = searchParams.get("total");
  const value = searchParams.get("value");


  useEffect(() => {
    if (value !== null) {
      dispatch(
        getPostsSearch(
          `q=${value}&sortBy=${sortBy ? sortBy : "id"}&order=${
            order ? order : "asc"
          }&limit=${limit}&skip=${page ? ((+page - 1) * limit) % +total : 0}`
        )
      );
    }
  }, [order, sortBy, page, value]);

  useEffect(() => {
    if (searchPostsData) {
      if (searchPostsData.posts) {
        setPosts(searchPostsData.posts);
        setTotalPosts(searchPostsData.total);
      }
    }
  }, [searchPostsData]);

  //handel pagination
  const getLimit = async (newOffset, selected) => {
    dispatch(
      getPostsSearch(
        `q=${value}&sortBy=${sorting[0]}&order=${sorting[1]}&limit=${limit}&skip=${newOffset}`
      )
    );
    navigate(
      `?value=${value}&page=${selected + 1}&sortBy=${
        sortBy ? sortBy : "id"
      }&order=${order ? order : "asc"}&total=${totalPosts}`
    );
  };

  return (
    <div className="w-[90%] mx-auto min-h-screen pt-[120px] pb-5">
      <SortPosts
        sortBy={sortBy}
        order={order}
        totalPosts={totalPosts}
        page={page}
        setSorting={setSorting}
        searchValue={value}
      />
      <h1 className="lg:text-3xl text-xl font-bold capitalize mb-10 shadow-blue-400 shadow-sm border-2 border-blue-400 text-zinc-900 dark:text-white w-fit mx-auto p-3 dark:bg-zinc-900 bg-slate-200 rounded-md">
        Search Results related to : {value}
      </h1>
      <div className="flex justify-between flex-wrap gap-5">
        {posts.map((post) => (
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

export default SearchPage;
