const initialState={}

export const addPostId = (state=initialState, action) => {
  switch (action.type) {
			case "ADD_ID":
				return {...action.payload}
			default:
				return state
		}
}