import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getAllPosts } from "../redux/actions/postsAction"
import Pagination from '../utils/Pagination'
import BlogCard from '../components/BlogCard'
import { useSearchParams } from 'react-router-dom'




const Home = () => {
  const [allposts, setAllPosts] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)

  const postsData = useSelector(state=> state.postsReducer.posts)
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams()
  const page = searchParams.get("page")
  const limit = 12




  
  useEffect(()=>{
    if(page !== null, totalPosts > 0){
      dispatch(getAllPosts(`limit=12&skip=${((+page - 1) * limit) % 251}`))
    }else{
      dispatch(getAllPosts(`limit=12`))
    }
  },[totalPosts, page])


  useEffect(()=>{
    if(postsData){
      if(postsData.posts){
        setAllPosts(postsData.posts)
        setTotalPosts(+postsData.total)
      }
    }
  },[postsData])

  //handel pagination
  const getLimit = async (newOffset) => {
    dispatch(getAllPosts(`limit=12&skip=${newOffset}`))
  };



  return (
    <div className='w-[90%] mx-auto min-h-screen pt-[120px] pb-5'>
    <div className='flex justify-between flex-wrap gap-5'>
      {
        allposts.map(post=>(
        <BlogCard key={post.id} post={post}/>
        ))
      }
    </div>
    <Pagination totalPosts={totalPosts} getLimit={getLimit}/>
    </div>
  )
}

export default Home