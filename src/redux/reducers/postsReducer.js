import {
  GET_ALL_POSTS,
  SINGLE_POST,
  ADD_NEW_POST,
  EDIT_POST,
  DELETE_POST,
} from "../types";

const initState = {
  posts: [],
  singlePost: [],
  addPost: [],
  editPost: [],
  deletePost: [],
};

const postsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return { posts: action.payload };
    case SINGLE_POST:
      return { singlePost: action.payload };
    case ADD_NEW_POST:
      return { addPost: action.payload };
    case EDIT_POST:
      return { editPost: action.payload };
    case DELETE_POST:
      return { deletePost: action.payload };
    default:
      return state;
  }
};

export default postsReducer;
