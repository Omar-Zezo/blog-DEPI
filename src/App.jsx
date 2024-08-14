import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./screens/Home"
import Navbar from "./utils/Navbar"
import { useEffect, useState } from "react"
import BlogPage from "./screens/BlogPage"
import SearchPage from "./screens/SearchPage"
import TagPage from "./screens/TagPage"
import AddNewPost from "./screens/AddNewPost"
import UpdatePost from "./screens/UpdatePost"





function App() {
  const [themeMode, setThemeMode] = useState("")

  // Theme Mode 
  const getMode = (mode)=>{
    setThemeMode(mode)
    localStorage.setItem("theme", mode)
  }

  useEffect(()=>{
    if(localStorage.getItem("theme")){
      document.body.classList = localStorage.getItem("theme")
    }else if(window.matchMedia("(prefers-color-scheme: dark)").matches){
      document.body.classList.add("dark")
    }else{
      document.body.classList = "light"
      localStorage.setItem("theme", "light")
    }
  },[themeMode])


  return (
    <div className="dark:bg-zinc-800">
      <BrowserRouter>
        <Navbar getMode={getMode}/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/post/:id" element={<BlogPage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/tag/:slug" element={<TagPage/>}/>
          <Route path="/add-new-post" element={<AddNewPost/>}/>
          <Route path="/update-post/:id" element={<UpdatePost/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
