import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getPostsTag } from "../redux/actions/tagsAction"
import Pagination from '../utils/Pagination'
import BlogCard from '../components/BlogCard'
import { useParams } from 'react-router-dom'


const TagPage = () => {
  const [allposts, setAllPosts] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)

  const postsTagData = useSelector(state=> state.tagsReducer.postsTag)
  const dispatch = useDispatch()

  const {slug} = useParams()


  useEffect(()=>{
    if(slug){
        dispatch(getPostsTag(slug, 'limit=12'))
    }
  },[slug])

  useEffect(()=>{
    if(postsTagData){
      if(postsTagData.posts){
        setAllPosts(postsTagData.posts)
        setTotalPosts(postsTagData.total)
      }
    }
  },[postsTagData])

  //handel pagination
  const getLimit = async (newOffset) => {
    dispatch(getPostsTag(slug, `limit=12&skip=${newOffset}`))
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

export default TagPage