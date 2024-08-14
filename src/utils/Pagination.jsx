import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";

const Pagination = ({totalPosts, getLimit}) => {
  const [pageNumber, setPageNumber] = useState(null)
  const limit = 12;

  const navigate = useNavigate()
  
  const [searchParams] = useSearchParams()
  const page = searchParams.get("page")



  const handlePageClick = (event) => {
    const newOffset = (event.selected * limit) % totalPosts;
    getLimit(newOffset);
    navigate(`?page=${event.selected + 1}`)
  };

  const pageCount = Math.ceil(totalPosts / limit);

  useEffect(()=>{
    if(page){
      setPageNumber(+page - 1)
    }
  },[page])

  return (
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        forcePage={pageNumber}
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
