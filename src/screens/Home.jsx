import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getAllPosts } from "../redux/actions/postsAction"
import Pagination from '../utils/Pagination'
import BlogCard from '../components/BlogCard'
import { useSearchParams, useNavigate } from 'react-router-dom'


const Home = () => {
  const [allposts, setAllPosts] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [sorting, setSorting] = useState(['id', 'asc'])

  const navigate = useNavigate()

  const postsData = useSelector(state=> state.postsReducer.posts)
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams()

  const page = searchParams.get("page")
  const sortBy = searchParams.get("sortBy")
  const order = searchParams.get("order")
  const total = searchParams.get("total")

  const limit = 12


  useEffect(()=>{
    if(page !== null && totalPosts > 0){
      dispatch(getAllPosts(`sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${((+page - 1) * limit) % totalPosts}`))
    }
  },[page, totalPosts])




  useEffect(()=>{
    if(postsData){
      if(postsData.posts){
        setAllPosts(postsData.posts)
        setTotalPosts(postsData.total)
      }
    }
  },[postsData])

  //handel pagination
  const getLimit = async (newOffset, selected) => {
    dispatch(getAllPosts(`sortBy=${sorting[0]}&order=${sorting[1]}&limit=${limit}&skip=${newOffset}`))
    navigate(`?page=${selected + 1}&sortBy=${sortBy ? sortBy:"id"}&order=${order ? order : "asc"}&total=${totalPosts}`)
  };


  //handel Sorting 
  useEffect(()=>{
    dispatch(getAllPosts(`sortBy=${sortBy ? sortBy : "id"}&order=${order ? order : "asc"}&limit=${limit}&skip=${page ? ((+page - 1) * limit) % +total : 0}`))
  },[order])



  return (
    <div className='w-[90%] mx-auto min-h-screen pt-[120px] pb-5'>
      <div className='w-72 pl-2 flex items-center gap-2 mb-5'>
        <span className='text-zinc-900 dark:text-white text-lg font-semibold'>Sort Posts by: </span>
        <select value={`${sortBy}-${order}`} className='flex-grow outline-none bg-slate-200 dark:bg-zinc-900 dark:text-white ' onChange={(e)=>{
          setSorting(e.target.value.split('-'))
          navigate(`?${page ? `page=${page}&`:''}sortBy=${e.target.value.split('-')[0]}&order=${e.target.value.split('-')[1]}&total=${totalPosts}`)
        } }>
          <option value={"id-asc"}>Post ID ASC</option>
          <option value={"id-desc"}>Post ID DESC</option>
          <option value={"title-asc"}>Post Title ASC</option>
          <option value={"title-desc"}>Post Title DESC</option>
        </select>
      </div>
    <div className='flex justify-between flex-wrap gap-5'>
      {
        allposts.map(post=>(
        <BlogCard key={post.id} post={post}/>
        ))
      }
    </div>
    <Pagination totalPosts={totalPosts} getLimit={getLimit} pageNumber={+page}/>
    </div>
  )
}

export default Home