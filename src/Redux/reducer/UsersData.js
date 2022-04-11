const initialState={
	user:[],
	postId:[],
}
export const usersData = (state=initialState,action) => {
  switch (action.type) {
			case "GET_USERS_DATA":
				return {...state,user:action.payload}
			case "POST_ID_DATA":
				return {...state,postId:action.payload}
			default:
				return state
		}
}