import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Logo, LogoWhite } from "../assets/images";
import { Close, Menu, Moon, Plus, SearchIcon, Sun, Write } from "../assets/svg";
import { useSelector, useDispatch } from "react-redux";
import { getAllTags } from "../redux/actions/tagsAction";

const Navbar = ({ getMode }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchPage, setSearchPage] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const [tagsList, setTagsList] = useState(false);

  const tagsData = useSelector((state) => state.tagsReducer.tags);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (searchValue !== "") {
      navigate(`/search?value=${searchValue}`);
      setSearchPage(false);
    }
  };

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  useEffect(() => {
    if (tagsData) {
      setAllTags(tagsData);
    }
  }, [tagsData]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 dark:bg-zinc-900 bg-white shadow-md">
      <div className="w-[90%] flex items-center mx-auto py-4">
        <div className="w-[25%]">
          <a href="/">
            {localStorage.getItem("theme") === "light" ? (
              <img width={100} src={Logo} alt="logo" />
            ) : (
              <img width={100} src={LogoWhite} alt="logo" />
            )}
          </a>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="size-12 flex justify-center items-center rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800">
            <Link to="/add-new-post">
            <img
              className="cursor-pointer"
              width={30}
              src={Write}
              alt="add-blog"
            />
            </Link>
          </div>
          {localStorage.getItem("theme") === "light" ? (
            <div className="size-10 flex justify-center items-center rounded-full hover:bg-slate-100">
              <img
                className="cursor-pointer"
                width={30}
                src={Sun}
                alt="dark-mode"
                onClick={() => {
                  getMode("dark");
                }}
              />
            </div>
          ) : (
            <div className="size-12 flex justify-center items-center rounded-full hover:bg-zinc-800">
              <img
                className="cursor-pointer"
                width={30}
                src={Moon}
                alt="light-mode"
                onClick={() => {
                  getMode("light");
                }}
              />
            </div>
          )}
          <div className="size-12 flex justify-center items-center rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800">
            <img
              className="cursor-pointer"
              width={30}
              src={SearchIcon}
              alt="search"
              onClick={() => setSearchPage(!searchPage)}
            />
          </div>
          <div className="size-12 flex justify-center items-center rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800">
            <img
              width={50}
              src={Menu}
              alt="menu"
              className="cursor-pointer"
              onClick={() => setShowMenu(true)}
            />
          </div>
        </div>
      </div>
      <div
        className={`${
          showMenu ? "right-0" : "right-[-100%]"
        } duration-300 text-center pb-5 overflow-y-auto pt-16 xl:w-[40%] w-full size-full fixed top-0 bg-slate-100 dark:bg-zinc-900 dark:text-white text-zinc-900`}
      >
        <img
          className="mx-auto mb-8 cursor-pointer"
          width={25}
          src={Close}
          alt="close"
          onClick={() => setShowMenu(false)}
        />
        {localStorage.getItem("theme") === "light" ? (
          <img className="mx-auto" width={150} src={Logo} alt="logo" />
        ) : (
          <img className="mx-auto" width={150} src={LogoWhite} alt="logo" />
        )}
        <ul className="flex flex-col justify-center gap-8 mt-10">
          <li>
            <NavLink
              className="text-xl font-medium text-zinc-900 dark:text-white hover:text-blue-500"
              to={"/"}
              onClick={() => setShowMenu(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <div
              className="flex justify-center items-center gap-1 cursor-pointer"
              onClick={() => setTagsList(!tagsList)}
            >
              <h5 className="text-xl font-medium text-zinc-900 dark:text-white hover:text-blue-500">
              All Tags
              </h5>
              <img width={20} src={Plus} alt="plus" />
            </div>
            <ul
              className={`flex flex-col gap-5 mt-5 ${
                tagsList ? "block" : "hidden"
              }`}
            >
              {allTags.map((tag) => (
                <li key={tag.name}>
                  <NavLink
                    to={`/tag/${tag.slug}`}
                    className="text-base underline text-zinc-900 dark:text-white hover:text-blue-500"
                    onClick={()=> setShowMenu(false)}
                  >
                    {tag.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>

      {/* Search Page */}
      <div
        className={`fixed w-full min-h-screen top-0 left-0 bg-black/90 ${
          searchPage ? "block" : "hidden"
        }`}
        onClick={() => setSearchPage(false)}
      >
        <form
          className="w-[95%] xl:w-1/2 mt-[80px] mx-auto flex flex-col items-center gap-5"
          onSubmit={onSubmit}
        >
          <input
            className="w-full rounded-md outline-none border-none py-5 px-3 dark:bg-zinc-800 dark:text-white"
            type="search"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <input
            type="submit"
            value={"Search"}
            className="p-3 w-[25%] cursor-pointer rounded-md bg-blue-500 text-white"
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
