import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import tagsReducer from "./tagsReducer";

const rootReducers = combineReducers({
    postsReducer: postsReducer,
    tagsReducer: tagsReducer,
})

export default rootReducers