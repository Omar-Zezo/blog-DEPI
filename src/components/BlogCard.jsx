import { Link } from "react-router-dom"
import { BlogImg } from "../assets/images"

const BlogCard = ({post}) => {
  return (
    <div className="w-[333px] flex-grow pb-5 rounded-md dark:bg-zinc-900 bg-gray-200">
        <Link to={`/post/${post.id}`}>
        <img className="w-full h-[300px] object-cover rounded-md" src={BlogImg} alt="blog-img"/>
        </Link>
        <div className="flex flex-col gap-3 items-center mt-5 px-2">
              <p className="text-base dark:text-white text-zinc-900 font-medium capitalize">{post.tags.join(' | ')}</p>
            <Link to={`/post/${post.id}`}>
            <h2 className="text-zinc-900 dark:text-white text-lg hover:text-blue-500 font-semibold text-center">{post.title}</h2>
            </Link>
        </div>
    </div>
  )
}

export default BlogCard