import { GET_ALL_TAGS, GET_POSTS_TAG } from "../types";

const initState = {
  tags: [],
  postsTag: [],
};

const tagsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_TAGS:
      return { tags: action.payload };
    case GET_POSTS_TAG:
      return {postsTag: action.payload}  
    default:
      return state;
  }
}

export default tagsReducer


