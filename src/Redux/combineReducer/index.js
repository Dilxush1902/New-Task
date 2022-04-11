import {combineReducers} from "redux";
import {usersData} from "../reducer/UsersData";
import {paginationData} from "../reducer/PaginationData";
import {addPostId} from "../reducer/addPostId";

export const reducer =combineReducers({
			usersData,
			paginationData,
			addPostId

})