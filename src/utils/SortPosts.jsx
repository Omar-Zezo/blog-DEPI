import { useNavigate } from "react-router-dom";

const SortPosts = ({sortBy, order, totalPosts, page, setSorting, searchValue}) => {

    const navigate = useNavigate();

  return (
    <div className="w-72 pl-2 flex items-center gap-2 mb-5">
      <span className="text-zinc-900 dark:text-white text-lg font-semibold">
        Sort Posts By:{" "}
      </span>
      <select
        value={`${sortBy}-${order}`}
        className="flex-grow outline-none bg-slate-200 dark:bg-zinc-900 dark:text-white "
        onChange={(e) => {
          setSorting(e.target.value.split("-"));
          navigate(
            `?${searchValue ? `value=${searchValue}&`:''}${page ? `page=${page}&` : ""}sortBy=${
              e.target.value.split("-")[0]
            }&order=${e.target.value.split("-")[1]}&total=${totalPosts}`
          );
        }}
      >
        <option value={"id-asc"}>Post ID ASC</option>
        <option value={"id-desc"}>Post ID DESC</option>
        <option value={"title-asc"}>Post Title ASC</option>
        <option value={"title-desc"}>Post Title DESC</option>
      </select>
    </div>
  );
};

export default SortPosts;
