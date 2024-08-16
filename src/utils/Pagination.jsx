import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const Pagination = ({totalPosts, getLimit, pageNumber}) => {
  const limit = 12;
  

  const handlePageClick = (event) => {
    const newOffset = (event.selected * limit) % totalPosts;
    getLimit(newOffset, event.selected);
  };

  const pageCount = Math.ceil(totalPosts / limit);



  return (
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        forcePage={pageNumber !== 0 ? pageNumber -1: 0}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        className="flex justify-center xl:gap-4 gap-2 mt-10"
        pageLinkClassName="text-white size-8 flex items-center justify-center rounded-sm bg-blue-500"
        activeLinkClassName="dark:bg-zinc-900 bg-blue-900"
        previousLinkClassName="text-white w-fit h-8 px-2 flex items-center justify-center rounded-sm bg-blue-500"
        nextLinkClassName="text-white w-fit h-8 px-2 flex items-center justify-center rounded-sm bg-blue-500"
        disabledLinkClassName="bg-slate-500 cursor-not-allowed"
      />
  );
};

export default Pagination;
